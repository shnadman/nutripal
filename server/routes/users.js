const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { modifyBasket } = require("../controllers/users");
const { getUserHub, createUser } = require("../controllers/users");

router.route("/me").get(auth, getUserHub).put(auth, modifyBasket);

router.route("/").post(createUser);

module.exports = router;
