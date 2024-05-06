const router = require("express").Router();
const {
  getPostList,
  handleCreatePost,
  handleModeComment,
  handleDeletePost,
  handleSavePost,
  handleShowHeart,
  getPostPersonal,
} = require("../controllers/postController");
const verifyToken = require("../middleWare/verifyToken");
const upload = require("../utils/uploadStorage");

router.get("/", verifyToken, getPostList);

router.get("/:id", verifyToken, getPostPersonal);

router.post("/saved/:id", verifyToken, handleSavePost);

router.put("/mode-comment/:id", verifyToken, handleModeComment);

router.post(
  "/public",
  verifyToken,
  upload.fields([
    { name: "publicImg", maxCount: 10 },
    { name: "videoUpload", maxCount: 1 },
  ]),
  handleCreatePost
);

router.post("/heart/:id", verifyToken, handleShowHeart);

router.delete("/:id", verifyToken, handleDeletePost);

module.exports = router;
