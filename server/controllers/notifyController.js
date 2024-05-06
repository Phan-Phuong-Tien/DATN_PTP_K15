const asyncHandler = require("express-async-handler");
const NotifyModel = require("../models/NotifyModel");
const UserModel = require("../models/UserModel");
const getAllFriend = require("../utils/getAllFriend");

const getNotifyList = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const listUserFriend = await getAllFriend(username);
    let listUser = await UserModel.find(
      {
        email: { $ne: username.email },
      },
      { password: 0 }
    );
    const listNotify = await NotifyModel.find({
      to: username._id,
    })
      .sort({ createdAt: -1 })
      .populate(["from", "postID"]);
    res.json({
      listUserFriend,
      listNotify,
      listUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleSeenNotify = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const notifyInfo = await NotifyModel.findOne({
      _id: req.params.id,
      to: username._id,
    });
    if (notifyInfo) {
      await NotifyModel.findByIdAndUpdate(req.params.id, {
        seen: req.query.seen ? !notifyInfo.seen : true,
      });
      res.json("Seen notification");
    } else res.status(400).json("Invalid user");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleRemoveNotify = asyncHandler(async (req, res) => {
  try {
    const notifyInfo = await NotifyModel.findByIdAndDelete(req.params.id);
    if (notifyInfo) res.json(notifyInfo);
    else res.status(400).json("Invalid user");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { getNotifyList, handleSeenNotify, handleRemoveNotify };
