const asyncHandler = require("express-async-handler");
const ChatModel = require("../models/ChatModel");
const FriendModel = require("../models/FriendModel");
const UserModel = require("../models/UserModel");

// const getUserFriend = asyncHandler(async (req, res) => {
//   const username = req.username;
//   try {
//     const listFriend = await FriendModel.find({
//       $or: [
//         {
//           from: username._id,
//         },
//         { to: username._id },
//       ],
//     }).populate(["from", "to"]);
//     var listUser = [];
//     listFriend.map((item) => {
//       if (item.from.email === username.email) listUser = [...listUser, item.to];
//       else listUser = [...listUser, item.from];
//     });
//     const listAllFriend = await getAllFriend(username);
//     res.json({ listAllFriend });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

async function checkExisted(yourID, userID) {
  return await FriendModel.findOne({
    $or: [
      { from: yourID, to: userID },
      { from: userID, to: yourID },
    ],
  }).populate(["from", "to"]);
}

const handleAddFriend = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const friendExisted = await checkExisted(username._id, req.params.id);
    if (!friendExisted) {
      const userInfo = await UserModel.findById(req.params.id);
      if (userInfo && userInfo._id !== username._id) {
        await FriendModel.create({
          from: username._id,
          to: req.params.id,
        });
        res.json("Add friend successful");
      } else res.status(400).json("Add friend failed");
    } else res.status(400).json("Friend is existed");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleAcceptFriend = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const friendExisted = await checkExisted(username._id, req.params.id);
    if (
      !friendExisted?.isConfirmed &&
      username.email === friendExisted.to.email
    ) {
      await FriendModel.findByIdAndUpdate(friendExisted._id, {
        isConfirmed: true,
      });
      const chatInfo = await ChatModel.findOne({
        participant: { $all: [username._id, req.params.id] },
      });
      if (!chatInfo) {
        await ChatModel.create({
          participant: [username._id, req.params.id],
        });
      } else await ChatModel.updateOne(chatInfo, { show: true });
      res.json("Accept successful");
    } else res.status(400).json("Accept failed");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleCancelFriend = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const friendExisted = await checkExisted(username._id, req.params.id);
    if (friendExisted) {
      await FriendModel.findByIdAndDelete(friendExisted._id);
      const chatInfo = await ChatModel.findOneAndUpdate(
        {
          participant: { $all: [username._id, req.params.id] },
        },
        {
          show: false,
        }
      );
      res.json("Cancel friend successful");
    } else
      res.status(400).json("This user haven't already existed in list friend");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  // getUserFriend,
  handleAddFriend,
  handleAcceptFriend,
  handleCancelFriend,
};
