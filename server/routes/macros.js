const Joi = require("joi");
const _ = require("lodash");
const { getMacros } = require("../controllers/macros");
const { Macros } = require("../models/macros");
const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router();

router.route("/").get(advancedResults(Macros), getMacros);

module.exports = router;
