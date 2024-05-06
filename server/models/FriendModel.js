const mongoose = require("../config/connectDB");

const FriendSchema = mongoose.Schema({
  from: {
    type: String,
    ref: "users",
    required: true,
  },
  to: {
    type: String,
    ref: "users",
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
});

const FriendModel = mongoose.model("friends", FriendSchema);

module.exports = FriendModel;
