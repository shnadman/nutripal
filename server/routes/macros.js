const { getMacros, getMacro } = require("../controllers/macros");
const {
  postComment,
  deleteComment,
  updateComment,
  getComments,
  likeComment,
  getLikes,
} = require("../controllers/comments");
const { Macros } = require("../models/macros");
const { validateComment } = require("../models/comment");
const express = require("express");
const { authenticate } = require("../middleware/auth");
const validate = require("../middleware/validate");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router();

router.route("/").get(advancedResults(Macros), getMacros);

router.route("/:id").get(getMacro);

router
  .route("/comments")
  .post(authenticate, validate(validateComment), postComment)
  .get(authenticate, getComments); //TODO:add admin authorization

router
  .route("/comments/:id")
  .delete(authenticate, deleteComment)
  .put(authenticate, updateComment);

router
  .route("/comments/:id/like")
  .put(authenticate, likeComment)
  .get(authenticate, getLikes);

module.exports = router;
