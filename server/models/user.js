const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
require("mongoose-type-url");

const compositionSchema = new mongoose.Schema({
  name: String,
  mealIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Macros",
      unique: true,
    },
  ],
});

const notificationSchema = new mongoose.Schema(
  {
    msg: String,
    userId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  avatar: { type: mongoose.SchemaTypes.Url, default: "" },
  starredMeals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Macros",
      // unique: true,
      // sparse: true,
    },
  ],
  compositions: { type: [compositionSchema] },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  notifications: [notificationSchema],
  weight: { type: Number },
  height: { type: Number },
  age: { type: Number },
  goal: { type: String, enum: ["Shredding", "Mass", "Maintenance"] },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });

  return schema.validate(user);
}

function validateEditUser(user) {
  const schema = Joi.object({
    name: Joi.string().allow("", null).min(2).max(50),
    passwordNew: Joi.string().allow("", null),
  }).unknown();

  return schema.validate(user);
}

function validateStarred(starred) {
  const schema = Joi.object({
    remove: Joi.boolean().required(),
    mealId: Joi.required(),
  });

  return schema.validate(starred);
}

function validateComposition(composition) {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  }).unknown();

  return schema.validate(composition);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateStarred = validateStarred;
exports.validateComposition = validateComposition;
exports.validateEditUser = validateEditUser;
