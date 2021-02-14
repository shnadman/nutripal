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
  addFriendRequest,
  getFriends,
  respondFriendRequest,
  getNotifications,
  getFriendHub,
  removeFriend,
  editProfile,
} = require("../controllers/users");
const {
  validateUser,
  validateStarred,
  validateComposition,
  validateEditUser,
} = require("../models/user");

router
  .route("/me")
  .get(authenticate, getUserHub)
  .put(authenticate, validate(validateStarred), modifyBasket)
  .post(authenticate, createComposition);

router
  .route("/me/profile")
  .put(authenticate, validate(validateEditUser), editProfile);

router.route("/me/notifications").get(authenticate, getNotifications);

router
  .route("/me/notifications/:id/:response")
  .put(authenticate, respondFriendRequest);

router
  .route("/me/compositions")
  .post(authenticate, validate(validateComposition), createComposition)
  .get(authenticate, getCompositions);

router.route("/me/friends").get(authenticate, getFriends);

router.route("/me/compositions/:id").put(authenticate, modifyCompositions);

router.route("/").post(validate(validateUser), createUser).get(getUsers);
router.route("/:userName").get(getUsers);

router
  .route("/me/friends/:id")
  .put(authenticate, addFriendRequest)
  .get(authenticate, getFriendHub);

router.route("/me/friends/:id/remove").put(authenticate, removeFriend);

module.exports = router;
