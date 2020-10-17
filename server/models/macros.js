const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const macrosSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    amount: { type: String, trim: true, default: "NA" },
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    price: { type: Number, default: 0 },
    ratio: [Number],
    score: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate with virtuals
macrosSchema.virtual("starred", {
  ref: "User",
  localField: "_id",
  foreignField: "starredMeals",
  justOne: false,
  count: true,
});

macrosSchema.pre("save", function (next) {
  const protRatio = (this.protein * 4) / this.calories;
  const fatRatio = (this.fat * 4) / this.calories;
  const carbstRatio = (this.carbs * 9) / this.calories;
  this.ratio = [protRatio, carbstRatio, fatRatio];
  next();
});

macrosSchema.methods.calcScore = function () {
  const { calories, protein, price, score } = this;
};

const Macros = mongoose.model("Macros", macrosSchema);

exports.Macros = Macros;
