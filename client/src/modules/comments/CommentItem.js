import React from "react";
import { useSelector } from "react-redux";
import { socket } from "api/config";
import { Avatar, Tooltip } from "@mui/material";
import TextUsername from "components/text/TextUsername";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import AlertDialog from "components/alert/AlertDialog";
import renderTime from "utils/renderTime";
import parse from "html-react-parser";

const CommentItem = ({ comment, isAuthor = false }) => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const { content, userID, createdAt } = comment;
  const [openDialog, setOpenDialog] = React.useState(false);
  const fullName = userID?.firstName + " " + userID?.lastName;
  const handleDeleteComment = () => {
    socket.emit("deleteComment", comment._id);
  };
  return (
    <>
      <div className="flex items-start gap-x-3 ">
        <Link to={"/profile/" + userID?._id}>
          <Avatar
            src={userID?.avatar}
            alt={fullName}
            sx={{ width: 52, height: 52 }}
          />
        </Link>
        <div>
          <div className="flex items-center gap-x-1">
            <TextUsername>{fullName}</TextUsername>
            {isAuthor && (
              <VerifiedIcon
                className="text-xl text-primary"
                titleAccess="Author"
              />
            )}
            <p className="text-[13px] font-normal text-text4 ml-1">
              {renderTime(createdAt)}
            </p>
          </div>
          <div className="flex items-start mt-1 gap-x-2">
            <h5 className="text-[15px] font-normal text-text2 dark:text-whiteSoft">
              {parse(content)}
            </h5>
            {userID?._id === currentUser?._id && (
              <Tooltip
                className="cursor-pointer opacity-80"
                onClick={() => setOpenDialog(true)}
              >
                <DeleteIcon
                  className="text-xl text-iconColor"
                  titleAccess="Delete comment"
                />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        handleExtra={handleDeleteComment}
        textConfirm="Bạn muốn xóa bình luận này ?"
        textSupport="Nhận xét này sẽ bị xóa khỏi bài viết"
      ></AlertDialog>
    </>
  );
};

export default CommentItem;
