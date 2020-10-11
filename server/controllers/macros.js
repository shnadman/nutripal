const Joi = require("joi");
const _ = require("lodash");
const { Macros } = require("../models/macros");
const express = require("express");
const router = express.Router();

exports.getMacros = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

function validate(req) {
  const schema = Joi.object({
    from: Joi.number().min(0).required(),
    to: Joi.number().min(0).required(),
  });

  return schema.validate(req);
}
