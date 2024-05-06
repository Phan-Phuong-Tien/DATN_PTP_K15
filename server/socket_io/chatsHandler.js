const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");

module.exports = function chatsHandler(socket, io) {
  socket.on("join-chat", (chatID) => {
    socket.join(chatID);
  });

  socket.on("send-message", async (message) => {
    try {
      const { chatID } = message;
      const addMessage = await MessageModel.create(message);
      const newMessage = await MessageModel.findById(addMessage._id).populate(
        "sender"
      );
      if (newMessage) {
        await ChatModel.findByIdAndUpdate(chatID, {
          latestMessage: newMessage._id,
        });
        io.to(chatID).emit("receive-message", newMessage);
      } else socket.emit("error", "Can't send message");
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("remove-message", async ({ chatID, messageID }) => {
    try {
      const removeMessage = await MessageModel.findByIdAndDelete(messageID);
      if (removeMessage) {
        const listMessage = await MessageModel.find({ chatID });
        await MessageModel.updateMany(
          { "reply.id": messageID },
          {
            reply: null,
          }
        );
        await ChatModel.findByIdAndUpdate(chatID, {
          latestMessage: listMessage[listMessage.length - 1]._id,
        });
        io.to(chatID).emit("receive-again", removeMessage);
      } else socket.emit("error", "Catch error");
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("rerender-chat", async (userID) => {
    try {
      setTimeout(async () => {
        const listChat = await ChatModel.find({
          participant: userID,
          show: true,
        })
          .sort({ updatedAt: -1 })
          .populate("participant", [
            "_id",
            "email",
            "firstName",
            "lastName",
            "avatar",
            "isActive",
          ])
          .populate("latestMessage");
        if (listChat.length > 0)
          io.sockets.emit("receive-info", { listChat, userID });
        else socket.emit("error", "Catch error");
      }, 3000);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("typing-message", async (chatID) => {
    try {
      const chatInfo = await ChatModel.findById(chatID);
      if (chatInfo) socket.broadcast.to(chatID).emit("receive-typing");
      else socket.emit("error", "Catch error");
    } catch (error) {
      socket.emit("error", error);
    }
  });
};
