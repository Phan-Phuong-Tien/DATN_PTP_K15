const router = require("express").Router();
const verifyToken = require("../middleWare/verifyToken");
const {
  getListChat,
  getMessageHistory,
} = require("../controllers/chatController");

router.get("/", verifyToken, getListChat);

router.get("/:id", verifyToken, getMessageHistory);

// router.post('/:id', verifyToken)

module.exports = router;
