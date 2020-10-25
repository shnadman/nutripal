const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser, validateStarred } = require("../models/user");
const { Macros } = require("../models/macros");
const mongoose = require("mongoose");

exports.getUserHub = async (req, res, next) => {
  const starredMeals = await User.findById(req.user._id)
    .populate("starredMeals")
    .populate({
      path: "compositions",
      populate: { path: "mealIds", model: "Macros" },
    })
    .select("starredMeals compositions name");

  res.send(starredMeals);
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find().populate("comments").select("-password");
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
    // let currCompositions = await User.findOne({
    //   _id: req.user._id,
    //   "compositions._id": id,
    // }).select("compositions");
    //
    // currCompositions = currCompositions.compositions[0].mealIds;
    // const intersection = _.intersection(
    //   currCompositions,
    //   mealIds.map((id) => id.toString())
    // );
    // console.log(mealIds.map((id) => id.toString()));
    // console.log(currCompositions);
    // console.log(intersection);
    // console.log(_.eq(intersection, mealIds));
    // if (_.eq(intersection, mealIds)) {
    //   return res
    //     .status(400)
    //     .send("All of the selected meals are already included in composition");
    // }
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
