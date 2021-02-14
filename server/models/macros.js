const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");
require("mongoose-type-url");
const _ = require("lodash");
const axios = require("axios");

const macrosSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    brand: { type: String, trim: true, defaultValue: "" },
    brandLogo: { type: String, default: "" },
    img: { type: mongoose.SchemaTypes.Url, default: "" },
    desc: { type: String, default: "" },
    category: { type: String, default: "" },
    servingSize: { type: Number, default: 1 },
    servingSizeUnit: {
      type: String,
      enum: ["fl oz", "g", "ml", "oz"],
      default: "unit",
    },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
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
  options: { select: "_id -starredMeals" },
});

macrosSchema.pre("save", function (next) {
  const protRatio = (this.protein * 4) / this.calories;
  const fatRatio = (this.fat * 4) / this.calories;
  const carbstRatio = (this.carbs * 9) / this.calories;
  this.ratio = [protRatio, carbstRatio, fatRatio];
  const brand = this.brand;

  if (brand !== "") {
    axios
      .get(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${this.brand}`
      )
      .then((res) => {
        this.brandLogo = res.data[0].logo;

        next();
      })
      .catch((err) => {
        console.error(err);
        next();
      });
  } else {
    next();
  }
});

macrosSchema.pre("find", function (next) {
  this.populate("starred").populate({
    path: "comments",
    populate: { path: "writer", model: "User", select: "name avatar" },
  });
  next();
});

macrosSchema.methods.calcScore = function () {
  const { calories, protein, price, score } = this;
};

const Macros = mongoose.model("Macros", macrosSchema);

exports.Macros = Macros;
