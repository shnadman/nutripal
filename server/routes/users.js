const auth = require("../middleware/auth");
const _ = require("lodash");
const { getUserHub, createUser } = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.route("/me").get(auth, getUserHub);
router.route("/").post(createUser);

module.exports = router;
