const router = require("express").Router();
const {
  getCommentByPostID,
  handleAddComments,
} = require("../controllers/commentController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/:id", verifyToken, getCommentByPostID);

router.post("/public/:id", verifyToken, handleAddComments);

module.exports = router;
