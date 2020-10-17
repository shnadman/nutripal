const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const validate = require("../middleware/validate");
const admin = require("../middleware/admin");
const { modifyBasket } = require("../controllers/users");
const { getUserHub, createUser, getUsers } = require("../controllers/users");
const { validateUser, validateStarred } = require("../models/user");

router
  .route("/me")
  .get(authenticate, getUserHub)
  .put(authenticate, validate(validateStarred), modifyBasket);

router.route("/").post(validate(validateUser), createUser).get(getUsers);

module.exports = router;
