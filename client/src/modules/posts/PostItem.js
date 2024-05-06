import React, { useState } from "react";
import useToggle from "hooks/useToggle";
import PostContent from "./parts/PostContent";
import PostImage from "./parts/PostImage";
import PostStatus from "./parts/PostStatus";
import PostMeta from "./parts/PostMeta";
import PostSaved from "./parts/PostSaved";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import PostTheme from "./parts/PostTheme";
import CommentFeature from "modules/comments/CommentFeature";
import axios from "api/config";
import Cookies from "js-cookie";
import renderTime from "utils/renderTime";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuNavItem";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setModeComment } from "redux/posts/postSlice";
import { Snackbar } from "@mui/material";
import useSnackbarInfo from "hooks/useSnackbarInfo";
import AlertDialog from "components/alert/AlertDialog";
import PostVideo from "./parts/PostVideo";

const PostItem = ({ postInfo }) => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const {
    _id,
    isLiked,
    saved,
    content,
    theme,
    authorID,
    modeComment,
    commentCount,
    linkVideo,
    type,
    listImg,
    listHeart,
    createdAt,
  } = postInfo;
  const { action, handleClose, stateOpen } = useSnackbarInfo();
  const [textAlert, setTextAlert] = useState("");
  const [like, setLike] = useToggle(isLiked);
  const [openDialog, setOpenDialog] = useState(false);
  const [modalComment, setModalComment] = useToggle(false);
  const [countLike, setCountLike] = useState(listHeart.length);
  const [open, setOpen] = stateOpen;
  const dispatch = useDispatch();
  const handleLiked = async () => {
    try {
      setLike();
      like ? setCountLike((c) => c - 1) : setCountLike((c) => c + 1);
      await axios({
        method: "POST",
        url: "/posts/heart/" + _id,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleModeComment = async () => {
    try {
      setTextAlert(modeComment ? "Không cho phép bình luận" : "Cho phép bình luận");
      await axios({
        method: "PUT",
        url: "/posts/mode-comment/" + _id,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      setOpen(true);
      dispatch(setModeComment(_id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePost = async () => {
    try {
      setTimeout(async () => {
        dispatch(deletePost(_id));
      }, 3000);
      setTextAlert("Bài đã xóa thành công");
      setOpen(true);
      await axios.delete("/posts/" + _id, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col px-4 rounded-xl bg-whiteSoft dark:bg-darkSoft">
        <div className="flex items-start justify-between mt-5 mb-3">
          <PostMeta timer={renderTime(createdAt)} author={authorID}></PostMeta>
          <div className="flex items-center gap-x-1">
            <PostSaved isSaved={saved} postID={_id}></PostSaved>
            {currentUser?._id === authorID._id && (
              <MenuNav>
                <MenuNavItem handleExtra={handleModeComment}>
                  {modeComment ? "Không cho phép" : "Cho phép"} bình luận
                </MenuNavItem>
                <MenuNavItem handleExtra={() => setOpenDialog(true)}>
                  Xóa bài viết
                </MenuNavItem>
              </MenuNav>
            )}
          </div>
        </div>
        {type === "theme" ? (
          <PostTheme theme={theme}>{content}</PostTheme>
        ) : (
          <>
            <PostContent>{content}</PostContent>
            {type === "image" ? (
              <PostImage src={listImg[0]} listImg={listImg}></PostImage>
            ) : (
              <PostVideo src={linkVideo}></PostVideo>
            )}
          </>
        )}
        <div className="py-3 ">
          <div className="flex items-center gap-x-10">
            <PostStatus
              hoverColor="group-hover:bg-heartColor group-hover:text-heartColor"
              quantity={countLike}
              textColor={
                like
                  ? "text-heartColor"
                  : "group-hover:text-heartColor transition-colors"
              }
              onClick={handleLiked}
              title={like ? "Unlike" : "Like"}
            >
              {like ? (
                <FavoriteIcon className="text-xl text-heartColor heart-active"></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon className="text-xl heart-active"></FavoriteBorderIcon>
              )}
            </PostStatus>
            <PostStatus
              hoverColor="group-hover:bg-thirdColor group-hover:text-thirdColor"
              textColor="group-hover:text-thirdColor"
              quantity={commentCount}
              className={!modeComment ? "pointer-events-none opacity-60" : ""}
              title="Comment"
              onClick={setModalComment}
            >
              {modeComment ? (
                <ChatBubbleOutlineOutlinedIcon className="text-xl"></ChatBubbleOutlineOutlinedIcon>
              ) : (
                <CommentsDisabledIcon className="text-xl"></CommentsDisabledIcon>
              )}
            </PostStatus>
          </div>
        </div>
      </div>
      {modalComment && (
        <CommentFeature
          modalComment={modalComment}
          handleHideModal={setModalComment}
          post={postInfo}
        ></CommentFeature>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={textAlert}
        action={action}
      />
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        handleExtra={handleDeletePost}
        textConfirm="Bạn muốn xóa bài đăng này?"
        textSupport="Bài đăng này sẽ bị mất vĩnh viễn nếu bạn xác nhận"
      ></AlertDialog>
    </>
  );
};

export default PostItem;
