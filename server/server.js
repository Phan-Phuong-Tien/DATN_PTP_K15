require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const chatsHandler = require("./socket_io/chatsHandler");
const commentHandler = require("./socket_io/commentHandler");
const notifyHandler = require("./socket_io/notifyHandler");
const userHandler = require("./socket_io/userHandler");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.URL_CLIENT,
  },
});

/* Configuration */
app.use(cors({ origin: [process.env.URL_CLIENT] }));
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/* Main route */
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/friends", require("./routes/friendRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/chats", require("./routes/chatRoute"));
app.use("/api/notify", require("./routes/notifyRoute"));

/* Socket handler */
io.on("connection", (socket) => {
  userHandler(socket, io);

  chatsHandler(socket, io);

  commentHandler(socket, io);

  notifyHandler(socket, io);

  socket.on("disconnect", async (reason) => {
    console.log("User 1 disconnected because " + reason);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
