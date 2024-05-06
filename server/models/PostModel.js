const mongoose = require("../config/connectDB");

const PostSchema = mongoose.Schema(
  {
    content: String,
    theme: Object,
    listImg: [{ type: String }],
    listHeart: [
      {
        type: String,
        ref: "users",
      },
    ],
    type: {
      type: String,
      enum: ["theme", "image", "video"],
      required: true,
    },
    modeComment: { type: Boolean, default: true },
    linkVideo: String,
    authorID: {
      type: String,
      ref: "users",
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;
