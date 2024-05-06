import { Avatar } from "@mui/material";
import React from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useToggle from "hooks/useToggle";
import PostAddNew from "modules/posts/PostAddNew";

const PostFeature = ({ linkInfo, username, avatar }) => {
  const [showModal, setShowModal] = useToggle(false);
  const [postType, setPostType] = React.useState("");
  const handleOpenModalPost = (type = "") => {
    if (username) {
      setShowModal(true);
      setPostType(type);
    }
  };
  return (
    <>
      <div className="px-4 pt-4 pb-3 bg-whiteSoft dark:bg-darkSoft rounded-xl">
        {showModal && (
          <PostAddNew
            handleHideModal={setShowModal}
            type={postType}
          ></PostAddNew>
        )}
        <div className="flex items-center pb-3 border-b gap-x-3 border-graySoft dark:border-gray-700">
          <Link to={linkInfo}>
            <Avatar alt="" src={avatar} sx={{ width: 42, height: 42 }} />
          </Link>
          <div
            className="flex items-center flex-1 px-5 py-3 transition-all rounded-full cursor-pointer hover:bg-strock bg-graySoft dark:bg-gray-700 hover:dark:bg-gray-600 text-text3 dark:text-text4"
            onClick={() => handleOpenModalPost()}
          >
            {username && `Chào ${username}, bạn đang nghĩ gì vậy?`}
          </div>
        </div>
        <div className="flex justify-between pt-3">
          <div
            className="flex justify-center flex-1 py-[14px] transition-all rounded-lg cursor-pointer hover:bg-graySoft gap-x-3 hover:dark:bg-gray-700 text-text3 dark:text-text4"
            onClick={() => handleOpenModalPost("image")}
          >
            <CollectionsIcon className="text-successColor"></CollectionsIcon>
            Ảnh
          </div>
          <div
            className="flex justify-center flex-1 py-[14px] transition-all rounded-lg cursor-pointer hover:bg-graySoft gap-x-3 hover:dark:bg-gray-700 text-text3 dark:text-text4"
            onClick={() => handleOpenModalPost("video")}
          >
            <VideoLibraryIcon className="text-errorColor"></VideoLibraryIcon>
            Video
          </div>
        </div>
      </div>
    </>
  );
};

PostFeature.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  linkInfo: PropTypes.string,
};

export default PostFeature;
