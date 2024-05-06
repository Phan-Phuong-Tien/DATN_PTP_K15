const FriendModel = require("../models/FriendModel");

module.exports = async function getAllFriend(username) {
  const listFriend = await FriendModel.find({
    $or: [
      {
        from: username._id,
      },
      { to: username._id },
    ],
  }).populate(["from", "to"]);
  var listUser = [];
  listFriend.map((item) => {
    if (item.from.email === username.email)
      listUser = [
        ...listUser,
        { ...item.to._doc, isConfirmed: item.isConfirmed, isSender: true },
      ];
    else
      listUser = [
        ...listUser,
        { ...item.from._doc, isConfirmed: item.isConfirmed, isSender: false },
      ];
  });
  return listUser;
};
