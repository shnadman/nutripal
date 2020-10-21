const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const validate = require("../middleware/validate");
const admin = require("../middleware/admin");
const {
  getUserHub,
  createUser,
  getUsers,
  modifyBasket,
  createComposition,
  modifyCompositions,
  getCompositions,
} = require("../controllers/users");
const {
  validateUser,
  validateStarred,
  validateComposition,
} = require("../models/user");

router
  .route("/me")
  .get(authenticate, getUserHub)
  .put(authenticate, validate(validateStarred), modifyBasket)
  .post(authenticate, createComposition);

router
  .route("/me/compositions")
  .post(authenticate, validate(validateComposition), createComposition)
  .get(authenticate, getCompositions);

router.route("/me/compositions/:id").put(authenticate, modifyCompositions);

router.route("/").post(validate(validateUser), createUser).get(getUsers);

module.exports = router;
