import React from "react";
import { useState } from "react";
import { socket } from "api/config";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AlertDialog from "components/alert/AlertDialog";
import TextLight from "components/text/TextLight";

const MessageItem = ({
  yourself = true,
  children,
  fullName = "",
  senderInfo,
  userID = {},
  messageID,
  handleReplyMessage = () => {},
  replyInfo = null,
}) => {
  const { id } = useParams();
  const { avatar, _id } = senderInfo;
  const [openDialog, setOpenDialog] = useState(false);
  const handleRemoveMessage = () => {
    socket.emit("remove-message", { chatID: id, messageID });
    socket.emit("rerender-chat", userID.userInfo._id);
  };
  const vocative =
    replyInfo?.userID === _id
      ? "chính bạn"
      : yourself
      ? userID.userInfo.lastName
      : "bạn";
  return (
    <div
      className={`flex ${replyInfo && "mt-12"} relative ${
        yourself && "flex-row-reverse"
      } items-start gap-x-2 group`}
    >
      <Link to={"/profile/" + _id} title={fullName}>
        <Avatar
          src={avatar}
          style={{ width: 20, height: 20 }}
          className="mt-[10px]"
        ></Avatar>
      </Link>
      {replyInfo && (
        <div
          className={`absolute z-10 bottom-1/2 max-w-[70%] flex flex-col ${
            yourself ? "right-7 items-end" : "left-7"
          }`}
          onClick={(e) => console.log(e.target)}
        >
          <TextLight className="text-[13px] mb-1">
            {yourself ? "Bạn" : userID.userInfo.lastName} đã trả lời {vocative}
          </TextLight>
          <div className="w-fit px-3 pt-2 pb-6 m-0 line-clamp-1 text-[15px] bg-slate-200 text-text1 dark:text-white dark:bg-darkSoft rounded-2xl opacity-50 cursor-pointer">
            {replyInfo.content}
          </div>
        </div>
      )}
      <div
        className={`px-3 py-2 z-20 font-normal text-[15px] rounded-3xl ${
          yourself
            ? "bg-primary text-white"
            : "bg-graySoft text-text1 dark:text-white dark:bg-gray-700"
        } max-w-[70%]`}
      >
        {children}
      </div>
      {messageID && (
        <div className="z-20 flex items-center opacity-0 gap-x-1 group-hover:opacity-100">
          {yourself && (
            <Tooltip title="Delete">
              <IconButton
                onClick={() => setOpenDialog(true)}
                className="mt-1 transition-all w-7 h-7 dark:bg-gray-700 hover:dark:bg-gray-600 bg-graySoft hover:bg-strock"
              >
                <DeleteIcon className="text-base text-text3 dark:text-text4" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Reply">
            <IconButton
              className="mt-1 transition-all w-7 h-7 dark:bg-gray-700 hover:dark:bg-gray-600 bg-graySoft hover:bg-strock"
              onClick={handleReplyMessage}
            >
              <ReplyIcon className="text-base text-text3 dark:text-text4" />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        handleExtra={handleRemoveMessage}
        textConfirm="Bạn có muốn xóa tin nhắn này không ?"
      ></AlertDialog>
    </div>
  );
};

export default MessageItem;
