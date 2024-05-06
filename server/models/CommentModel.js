const mongoose = require("../config/connectDB");

const CommentSchema = mongoose.Schema(
  {
    content: String,
    like: Number,
    userID: {
      type: String,
      ref: "users",
    },
    postID: {
      type: String,
      ref: "posts",
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comments", CommentSchema);

module.exports = CommentModel;
