const router = require("express").Router();
const {
  getNotifyList,
  handleSeenNotify,
  handleRemoveNotify,
} = require("../controllers/notifyController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/list", verifyToken, getNotifyList);

router.post("/:id", verifyToken, handleSeenNotify);

router.delete("/:id", verifyToken, handleRemoveNotify);

module.exports = router;
