const Joi = require("joi");
const _ = require("lodash");
const { Macros } = require("../models/macros");
const { Comment } = require("../models/comment");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

exports.postComment = async (req, res, next) => {
  const { responseTo, content } = req.body;

  const commentObject = {
    writer: mongoose.Types.ObjectId(req.user._id),
    responseTo,
    content,
  };
  const comment = new Comment(commentObject);

  comment.save();

  const user = await User.findByIdAndUpdate(req.body.writer, {
    $addToSet: { comments: comment._id },
  });

  const macros = await Macros.findByIdAndUpdate(req.body.responseTo, {
    $addToSet: { comments: comment._id },
  });

  if (!user || !macros) return res.status(404).send("User/Macros not found");
  res.status(200).send(comment);
};

exports.deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).send("Comment not found");

  if (comment.writer.toString() !== req.user._id)
    return res.status(401).send(`Not authorized to delete this comment`);

  comment.remove();

  res.status(200).send(comment);
};

exports.updateComment = async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).send("Comment not found");

  if (comment.writer.toString() !== req.user._id)
    return res.status(401).send(`Not authorized to update this comment`);

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(comment);
};

exports.likeComment = async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).send("Comment not found");

  //Unliking
  if (comment.likedBy.includes(req.user._id)) {
    comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likedBy: req.user._id },
      },
      { new: true }
    );
    res.status(200).send({ ...comment, currLike: false });
  } else {
    comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likedBy: req.user._id },
      },
      { new: true }
    );
    res.status(200).send({ ...comment, currLike: true });
  }
};

exports.getComments = async (req, res, next) => {
  const comments = await Comment.find().populate("likedBy", "name");
  if (!comments) return res.status(404).send("No comments found!");
  res.status(200).send(comments);
};
