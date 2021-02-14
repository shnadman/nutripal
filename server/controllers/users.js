const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser, validateStarred } = require("../models/user");
const { Macros } = require("../models/macros");
const mongoose = require("mongoose");

exports.getUserHub = async (req, res, next) => {

  const hub = await User.findById(req.user._id)
    .populate("starredMeals")
    .populate({
      path: "compositions",
      populate: { path: "mealIds", model: "Macros" },
    })
    .populate({
      path: "friends",
      select: "starredMeals compositions name friends",
    })
    .select("starredMeals compositions friends name avatar");

  res.send(hub);
};

exports.editProfile = async (req, res, next) => {
  const { name, passwordOld, passwordNew, avatar } = req.body;

  let user;

  user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (passwordOld) {
    const validPassword = await bcrypt.compare(passwordOld, user.password);
    if (!validPassword) return res.status(400).send("Wrong password entered");
    user.password = passwordNew;
  }
  if (avatar) user.avatar = avatar;

  user.save();

  res.send(user);
};

exports.getFriendHub = async (req, res, next) => {
  const { id } = req.params;

  const hub = await User.findById(id)
    .populate("starredMeals")
    .populate({
      path: "compositions",
      populate: { path: "mealIds", model: "Macros" },
    })
    .populate({
      path: "friends",
      select: "starredMeals compositions name friends",
    })
    .select("starredMeals compositions friends name avatar");

  res.send(hub);
};

exports.getUsers = async (req, res, next) => {
  const { userName } = req.params;
  let users;
  if (!userName) {
    users = await User.find().populate("comments").select("-password");
  } else {
    users = await User.find({
      name: { $regex: new RegExp(".*" + userName + ".*", "i") },
    })
      .populate("comments")
      .select("-password");
  }
  res.send(users);
};

exports.createUser = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .set({ "x-auth-token": token, "x-user-id": user._id })
    .send(_.pick(user, ["_id", "name", "email"]));
};

exports.modifyBasket = async (req, res, next) => {
  const { error } = validateStarred(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { mealId, remove } = req.body;
  const { name } = await Macros.findById(mealId);
  if (remove) {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { starredMeals: mealId },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("starredMeals")
      .select("starredMeals");
    res.status(200).send({ ..._.pick(user, ["starredMeals"]), name, remove });
  } else {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { starredMeals: mealId },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("starredMeals")
      .select("starredMeals");
    res.status(200).send({ ..._.pick(user, ["starredMeals"]), name, remove });
  }
};

exports.createComposition = async (req, res, next) => {
  const { mealIds, name } = req.body;
  const currCompositions = await User.findOne({
    _id: req.user._id,
  }).select("compositions");

  const currCompositionsNames = currCompositions.compositions.map(
    (c) => c.name
  );

  if (currCompositionsNames.includes(name)) {
    return res
      .status(400)
      .send("Name already in use, please use a different one");
  }

  const compositions = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { compositions: { mealIds, name } },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate({
      path: "compositions",
      populate: { path: "mealIds", model: "Macros" },
    })
    .select("compositions");

  res.status(200).send(compositions);
};

exports.getCompositions = async (req, res, next) => {
  const compositions = await User.find(mongoose.Types.ObjectId(req.user._id))
    .populate({
      path: "compositions",
      populate: { path: "mealIds", model: "Macros" },
    })
    .select("compositions");

  res.status(200).send(compositions);
};

exports.modifyCompositions = async (req, res, next) => {
  const { id } = req.params;

  const { mealIds, name } = req.body;

  if (_.isEmpty(mealIds)) {
    const compositions = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: { compositions: { _id: id } },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate({
        path: "compositions",
        populate: { path: "mealIds", model: "Macros" },
      })
      .select("compositions");
    res.status(200).send(compositions);
  } else {
    const compositions = await User.findOneAndUpdate(
      { _id: req.user._id, "compositions._id": id },
      {
        $addToSet: {
          "compositions.$.mealIds": mealIds,
          //      "compositions.$.name": name,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate({
        path: "compositions",
        populate: { path: "mealIds", model: "Macros" },
      })
      .select("compositions");
    res.status(200).send(compositions);
  }
};

exports.addFriendRequest = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);
  const friend = await User.findById(id);
  if (!friend) return res.status(404).send("User not found!");

  const notification = {
    msg: `${user.name} has sent you a friend request`,
    userId: mongoose.Types.ObjectId(req.user._id),
  };

  if (
    _.findIndex(friend.notifications, ["userId", notification.userId]) === -1
  ) {
    friend.notifications.push(notification);
    friend.save();
  } else {
    return res.status(403).send("Friend request already sent");
  }

  res.status(200).send(friend.notifications);
};

exports.getNotifications = async (req, res, next) => {
  const notifications = await User.findById(req.user._id).select(
    "notifications"
  );
  res.status(200).send(notifications);
};

exports.respondFriendRequest = async (req, res, next) => {
  const { id, response } = req.params;

  console.log(req.params);

  const user = await User.findById(req.user._id).select(
    "notifications friends"
  );
  const notification = _.find(user.notifications, [
    "_id",
    mongoose.Types.ObjectId(id),
  ]);

  if (!notification) return res.status(404).send("Notification not found");

  if (response === "accept") {
    //Setting both sides as friends
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { friends: notification.userId },
    });
    await User.findByIdAndUpdate(notification.userId, {
      $addToSet: { friends: req.user._id },
    });
  }
  const userResponse = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { notifications: { _id: id } } },
    {
      new: true,
      runValidators: true,
    }
  ).select("notifications friends");

  res.status(200).send(userResponse);
};

exports.getFriends = async (req, res, next) => {
  const friends = await User.find(mongoose.Types.ObjectId(req.user._id))
    .populate({
      path: "friends",
      select: "starredMeals compositions name friends",
    })
    .select("friends");

  res.status(200).send(friends);
};

exports.removeFriend = async (req, res, next) => {
  const { id } = req.params;

  const newFriendsList = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { friends: id },
    },
    { new: true, runValidators: true }
  ).select("friends");

  await User.findByIdAndUpdate(
    id,
    {
      $pull: { friends: req.user._id },
    },
    { new: true, runValidators: true }
  ).select("friends");

  res.status(200).send(newFriendsList);
};
