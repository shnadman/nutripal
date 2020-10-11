const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const macrosSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  price: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
});

macrosSchema.methods.calcScore = function () {
  const { calories, protein, price, score } = this;
};

const Macros = mongoose.model("Macros", macrosSchema);

exports.Macros = Macros;
