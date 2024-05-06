const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FriendModel = require("../models/FriendModel");
const ImageModel = require("../models/ImageModel");
const cloudinary = require("../config/cloudinary");
const ChatModel = require("../models/ChatModel");
const NotifyModel = require("../models/NotifyModel");
const shuffleArray = require("../utils/shuffleArray");
const removeTones = require("../utils/removeTones");
const getAllFriend = require("../utils/getAllFriend");

let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function searchListByName(str, name) {
  return removeTones(str.toLowerCase()).includes(
    removeTones(name.toLowerCase())
  );
}

const getUserList = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const { gender, name } = req.query;
    const filterQuery = (key, query) => query && { [key]: query };
    let listUser = await UserModel.find(
      {
        email: { $ne: username.email },
        ...filterQuery("gender", gender),
      },
      { password: 0 }
    );
    if (name)
      listUser = listUser.filter(
        (user) =>
          searchListByName(user.firstName, name) ||
          searchListByName(user.lastName, name)
      );
    const listFriend = await getAllFriend(username);
    res.json({ listUser: shuffleArray(listUser), listFriend });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getUserDetail = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const userDetail = await UserModel.findById(req.params.id, { password: 0 });
    if (userDetail) {
      const dateJoin =
        monthNames[userDetail?.createdAt.getMonth()] +
        " " +
        userDetail?.createdAt.getFullYear();
      const postCount = await PostModel.find({
        authorID: req.params.id,
      }).count();
      const listUpload = await ImageModel.find({
        userID: req.params.id,
      }).sort({
        createdAt: -1,
      });
      const listUserFriend = await FriendModel.find({
        $or: [
          {
            from: req.params.id,
          },
          { to: req.params.id },
        ],
        isConfirmed: true,
      }).populate(["from", "to"]);
      res.json({
        userInfo: {
          ...userDetail._doc,
          createdAt: dateJoin,
          listUpload,
          listUserFriend,
          chatID:
            username.email != userDetail.email &&
            (await ChatModel.findOne({
              participant: { $all: [username._id, req.params.id] },
            })),
        },
        listFriend: await getAllFriend(username),
        yourSelf: username.email == userDetail.email,
        postCount,
      });
    } else res.status(400).json("User is not valid");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleSearchHistory = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const { searchHistory } = username;
    if (!searchHistory.includes(req.query.keyword.trim())) {
      await UserModel.findByIdAndUpdate(username._id, {
        searchHistory: [req.query.keyword.trim(), ...searchHistory],
      });
    } else {
      await UserModel.findByIdAndUpdate(username._id, {
        searchHistory: [
          req.query.keyword,
          ...searchHistory.filter((q) => q !== req.query.keyword.trim()),
        ],
      });
    }
    const userInfo = await UserModel.findById(username._id);
    res.json(userInfo.searchHistory);
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleRemoveSearch = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    if (req.params.slug == "all") {
      await UserModel.findByIdAndUpdate(username._id, { searchHistory: [] });
    } else if (req.query.keyword) {
      await UserModel.findByIdAndUpdate(username._id, {
        searchHistory: username.searchHistory.filter(
          (q) => q !== req.query.keyword.trim()
        ),
      });
    } else res.status(400).json("Please type keyword to search");
    const userInfo = await UserModel.findById(username._id);
    res.json(userInfo.searchHistory);
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleDeleteImage = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const pictureInfo = await ImageModel.findOneAndDelete({
      _id: req.params.id,
      userID: username._id,
    });
    if (pictureInfo) {
      // const publicID = pictureInfo.link.split("/").pop().split(".")[0];
      // await cloudinary.destroy("FreshConnect/" + publicID);
      res.json("Deleted successful image");
    } else res.status(400).json("Delete failed");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleUpdateInfo = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const files = req.files;
    let newAvatar, newCoverImg;
    if (Object.keys(files).length > 0) {
      const { avatar, coverImg } = files;

      if (avatar) {
        const data = await cloudinary.upload(avatar[0].path, {
          folder: "FreshConnect",
        });
        newAvatar = new ImageModel({
          name: data.original_filename,
          link: data.url,
          public_id: data.public_id,
          userID: username._id,
        });
        await newAvatar.save();
      }

      if (coverImg) {
        const data = await cloudinary.upload(coverImg[0].path, {
          folder: "FreshConnect",
        });
        newCoverImg = new ImageModel({
          name: data.original_filename,
          link: data.url,
          public_id: data.public_id,
          userID: username._id,
        });
        await newCoverImg.save();
      }
    }

    await UserModel.findByIdAndUpdate(username._id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: newAvatar ? newAvatar.link : username.avatar,
      coverImg: newCoverImg ? newCoverImg.link : username.coverImg,
      detailInfo: {
        birthday: req.body.birthday === "dd/mm/yy" ? "" : req.body.birthday,
        workAt: req.body.workAt,
        desc: req.body.desc,
      },
    });
    const userInfo = await UserModel.findById(username._id);
    res.json(userInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  getUserList,
  getUserDetail,
  handleUpdateInfo,
  handleDeleteImage,
  handleSearchHistory,
  handleRemoveSearch,
};
