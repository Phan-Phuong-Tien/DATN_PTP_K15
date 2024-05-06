const mongoose = require("../config/connectDB");

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      ref: "users",
    },
    chatID: {
      type: String,
      ref: "chats",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    reply: Object,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("messages", MessageSchema);

module.exports = MessageModel;
