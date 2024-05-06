const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const CommentModel = require("../models/CommentModel");
const ImageModel = require("../models/ImageModel");
const NotifyModel = require("../models/NotifyModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const removeTones = require("../utils/removeTones");
const shuffleArray = require("../utils/shuffleArray");

async function checkSavedAndLiked(listPost, username) {
  const { listSaved, _id } = username;
  const listNewPost = listPost.map(async (post) => ({
    ...(post._doc || post),
    saved: listSaved.includes(post._id),
    isLiked: post.listHeart.includes(_id),
    commentCount: await CommentModel.find({ postID: post._id }).count(),
  }));
  return await Promise.all(listNewPost);
}

function searchListByContent(str, content) {
  return removeTones(str.toLowerCase()).includes(
    removeTones(content.toLowerCase())
  );
}

const getPostList = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    let listPost = await PostModel.find({}).populate("authorID", [
      "_id",
      "email",
      "firstName",
      "lastName",
      "avatar",
    ]);

    const { keyword, by } = req.query;
    if (keyword) {
      listPost = listPost.filter((post) =>
        searchListByContent(post.content, keyword)
      );
    }

    if (by) {
      switch (by) {
        case "like":
          listPost = listPost.sort((a, b) =>
            a.listHeart.length < b.listHeart.length ? 1 : -1
          );
          break;

        case "comment":
          const newListPost = listPost.map(async (post) => {
            const commentCount = await CommentModel.find({
              postID: post._id,
            }).count();
            return { ...post._doc, commentCount };
          });
          listPost = (await Promise.all(newListPost)).sort((a, b) =>
            a.commentCount < b.commentCount ? 1 : -1
          );
          break;

        default:
          listPost = listPost.sort((a, b) =>
            a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
          );
          break;
      }
      listPost = await checkSavedAndLiked(listPost, username);
    } else
      listPost = shuffleArray(await checkSavedAndLiked(listPost, username));
    res.json({ listPost });
  } catch (error) {
    const errorMsg = JSON.stringify(error);
    res.status(500).json(errorMsg);
  }
});

const getPostPersonal = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const { id } = req.params;
    const userInfo = await UserModel.findById(id);
    let postDetail = await PostModel.findById(id).populate("authorID", [
      "_id",
      "email",
      "firstName",
      "lastName",
      "avatar",
    ]);
    if (userInfo) {
      const { by } = req.query;
      const condition = !by
        ? { authorID: id }
        : {
            listHeart: id,
          };
      let listPost = await PostModel.find(condition)
        .populate("authorID", [
          "_id",
          "email",
          "firstName",
          "lastName",
          "avatar",
        ])
        .sort({ createdAt: -1 });

      if (by) {
        if (by === "liked") {
          listPost = await checkSavedAndLiked(listPost, userInfo);
          listPost = listPost.filter((post) => post.isLiked);
        } else {
          listPost = await checkSavedAndLiked(listPost, username);
          listPost = listPost.filter((post) => {
            return post.saved;
          });
        }
      }
      res.json({
        listPost: await checkSavedAndLiked(listPost, username),
      });
    } else if (postDetail) {
      postDetail = (await checkSavedAndLiked([postDetail], username))[0];
      res.json(postDetail);
    } else res.status(400).json("User invalid");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleModeComment = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const postInfo = await PostModel.findOne({
      _id: req.params.id,
      authorID: username._id,
    });
    if (postInfo) {
      await PostModel.findByIdAndUpdate(postInfo._id, {
        modeComment: !postInfo.modeComment,
      });
      res.json("Turn on/off mode comment");
    } else res.status(400).json("Catch error");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleCreatePost = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const { type } = req.body;
    console.log(type);
    let newPost;
    if (type === "theme") {
      newPost = await PostModel.create({
        ...req.body,
        authorID: username._id,
        theme: req.body.theme || { linkImg: null },
      });
      res.json(newPost);
    } else if (type === "image") {
      const files = req.files.publicImg;
      var listImg = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const data = await cloudinary.upload(file.path, {
            folder: "FreshConnect",
          });
          await ImageModel.create({
            name: data.original_filename,
            link: data.url,
            userID: username._id,
          });
          listImg.push(data.url);
        }
      }
      newPost = await PostModel.create({
        ...req.body,
        authorID: username._id,
        listImg,
      });
      res.json(newPost);
    } else if (type === "video") {
      const file = req.files.videoUpload[0];
      const data = await cloudinary.upload(file.path, {
        folder: "FreshConnect",
        resource_type: "video",
      });
      newPost = await PostModel.create({
        ...req.body,
        authorID: username._id,
        linkVideo: data.url,
      });
      res.json(newPost);
    } else res.status(400).json("Invalid post type");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, mess: "Error server" });
  }
});

const handleShowHeart = asyncHandler(async (req, res) => {
  try {
    const username = req.username;
    const postInfo = await PostModel.findById(req.params.id);
    if (!postInfo) res.status(400).json("Id post is invalid");
    else {
      let listHeart = postInfo.listHeart;
      const userIndex = listHeart.indexOf(username._id);
      userIndex === -1
        ? listHeart.push(username._id)
        : listHeart.splice(userIndex, 1);
      await PostModel.findByIdAndUpdate(req.params.id, {
        listHeart,
      });
      res.json({ postInfo });
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

const handleSavePost = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const postInfo = await PostModel.findById(req.params.id);
    if (!postInfo) res.status(400).json("Id post is invalid");
    else {
      let listSaved = username.listSaved;
      const postIndex = listSaved.indexOf(req.params.id);
      postIndex === -1
        ? listSaved.push(req.params.id)
        : listSaved.splice(postIndex, 1);
      await UserModel.findByIdAndUpdate(username._id, {
        listSaved,
      });
      res.json("Saved success");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleDeletePost = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const postInfo = await PostModel.findOneAndDelete({
      _id: req.params.id,
      authorID: username._id,
    });
    if (postInfo) {
      await CommentModel.deleteMany({
        postID: req.params.id,
      });
      await NotifyModel.deleteOne({
        postID: req.params.id,
      });
      const listUserSavedPost = await UserModel.find({
        listSaved: req.params.id,
      });
      for (const user of listUserSavedPost) {
        await UserModel.findByIdAndUpdate(user._id, {
          listSaved: user.listSaved.filter((postID) => postID != req.params.id),
        });
      }
      if (postInfo.type === "video") {
        const publicID = postInfo.linkVideo.split("/").pop().split(".")[0];
        await cloudinary.destroy("FreshConnect/" + publicID);
      }
      res.json("Delete success");
    } else res.status(400).json("Catch error");
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = {
  getPostList,
  getPostPersonal,
  handleCreatePost,
  handleModeComment,
  handleDeletePost,
  handleShowHeart,
  handleSavePost,
};
