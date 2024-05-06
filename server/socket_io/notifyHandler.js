const NotifyModel = require("../models/NotifyModel");
const UserModel = require("../models/UserModel");
const getAllFriend = require("../utils/getAllFriend");

async function getAllFriendById(authorID) {
  const username = await UserModel.findById(authorID);
  const listFriend = (await getAllFriend(username)).filter(
    (user) => user.isConfirmed
  );
  let listFriendID = [];
  for (const item of listFriend) listFriendID.push(item._id.toString());
  return listFriendID;
}

module.exports = function notifyHandler(socket, io) {
  socket.on("send-notify-message", (userID) => {
    console.log("userID: ", userID);
    socket.broadcast.emit("receive-notify-message", userID);
  });
  socket.on("send-notify-post", async (data) => {
    try {
      const {
        content,
        newPost: { _id, listImg, type, authorID },
      } = data;
      let notifyTitle = "đã đăng ";
      if (type === "image") {
        notifyTitle += `${
          listImg.length > 0
            ? listImg.length + ` ${listImg.length > 1 ? "ảnh" : " ảnh"} mới`
            : "1 tin mới"
        }${content ? `: ${content}` : ""}`;
      } else if (type === "video") {
        notifyTitle += `một video mới: "${content}"`;
      } else {
        notifyTitle += `một tin mới: "${content}"`;
      }
      const { _id: notifyID } = await NotifyModel.create({
        title: notifyTitle,
        postID: _id,
        from: authorID,
        to: await getAllFriendById(authorID),
        type: "post",
      });
      const { to } = await NotifyModel.findById(notifyID);
      socket.broadcast.emit("receive-notify", to);
    } catch (error) {
      console.log("error: ", error);
    }
  });

  socket.on("send-notify-comment", async (data) => {
    try {
      const { content, postID, userID, authorID } = data;
      const notifyTitle = `đã bình luận bài viết của bạn "${content}"`;
      const { _id } = await NotifyModel.create({
        title: notifyTitle,
        postID,
        from: userID,
        to: [authorID],
        type: "comment",
      });
      const { to } = await NotifyModel.findById(_id);
      socket.broadcast.emit("receive-notify", to);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("send-notify-friend", (data) => {
    socket.broadcast.emit("receive-notify", [data]);
  });
};
