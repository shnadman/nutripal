const Joi = require("joi");
const _ = require("lodash");
const { Macros } = require("../models/macros");
const express = require("express");
const router = express.Router();

exports.getMacros = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

exports.getMacro = async (req, res, next) => {
  const macros = await Macros.findById(req.params.id);
  if (!macros) return res.status(404).send("Macros not found!");
  res.status(200).json(macros);
};

function validate(req) {
  const schema = Joi.object({
    term: Joi.string().alphanum().max(255).required(),
  });

  return schema.validate(req);
}
