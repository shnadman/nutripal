const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "Macro",
    },
    content: {
      type: String,
      required: [true, "Can't post an empty comment"],
      maxlength: [500, "Comment can not be more than 500 characters"],
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    currLikedByUser: Boolean,
  },
  { timestamps: true }
);

function validateComment(comment) {
  const schema = Joi.object({
    content: Joi.string().min(1).max(500).required(),
  }).unknown();

  return schema.validate(comment);
}

const Comment = mongoose.model("Comment", commentSchema);

exports.Comment = Comment;
exports.validateComment = validateComment;
