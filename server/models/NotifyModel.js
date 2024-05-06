const mongoose = require("../config/connectDB");

const NotifySchema = mongoose.Schema(
  {
    title: String,
    from: {
      type: String,
      ref: "users",
    },
    to: [
      {
        type: String,
        ref: "users",
      },
    ],
    postID: {
      type: String,
      ref: "posts",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["post", "comment"],
    },
  },
  { timestamps: true }
);

const NotifyModel = mongoose.model("notify", NotifySchema);

module.exports = NotifyModel;
