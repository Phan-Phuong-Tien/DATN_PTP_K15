const router = require("express").Router();
const {
  getUserFriend,
  handleAddFriend,
  handleAcceptFriend,
  handleCancelFriend,
} = require("../controllers/friendController");
const verifyToken = require("../middleWare/verifyToken");

// router.get("/", verifyToken, getUserFriend);

router.post("/add/:id", verifyToken, handleAddFriend);

router.put("/accept/:id", verifyToken, handleAcceptFriend);

router.delete("/cancel/:id", verifyToken, handleCancelFriend);

module.exports = router;
