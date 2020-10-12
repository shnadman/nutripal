const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser, validateStarred } = require("../models/user");
const { Macros } = require("../models/macros");

exports.getUserHub = async (req, res, next) => {
  const starredMeals = await User.findById(req.user._id)
    .populate("starredMeals")
    .select("starredMeals -_id");

  res.send(starredMeals);
};

exports.createUser = async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
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
    );
    res.status(200).send(_.pick(user, ["starredMeals"]));
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
    );
    res.status(200).send({ ..._.pick(user, ["starredMeals"]), name });
  }
};
