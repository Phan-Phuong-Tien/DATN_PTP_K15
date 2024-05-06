const UserModel = require("../models/UserModel");

module.exports = function userHandler(socket, io) {
  socket.on("client-connect", async (currentUser) => {
    if (!currentUser) return;
    try {
      await UserModel.findByIdAndUpdate(currentUser._id, {
        isActive: true,
      });
      const listActive = await UserModel.find(
        {
          isActive: true,
        },
        {
          listSaved: 0,
          coverImg: 0,
          detailInfo: 0,
          password: 0,
        }
      );
      socket.broadcast.emit("user-active", listActive);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("client-disconnect", async (currentUser) => {
    if (!currentUser) return;
    try {
      await UserModel.findByIdAndUpdate(currentUser._id, {
        isActive: false,
      });
      const listActive = await UserModel.find(
        {
          isActive: true,
        },
        {
          listSaved: 0,
          coverImg: 0,
          detailInfo: 0,
          password: 0,
        }
      );
      socket.broadcast.emit("user-active", listActive);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("logout-active", async (currentUser) => {
    if (!currentUser) return;
    try {
      await UserModel.findByIdAndUpdate(currentUser._id, {
        isActive: false,
      });
      const listActive = await UserModel.find(
        {
          isActive: true,
        },
        {
          listSaved: 0,
          coverImg: 0,
          detailInfo: 0,
          password: 0,
        }
      );
      socket.broadcast.emit("user-active", listActive);
    } catch (error) {
      socket.emit("error", error);
    }
  });
};
