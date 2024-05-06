import React from "react";
import { useNavigate } from "react-router-dom";
import TextUsername from "components/text/TextUsername";
import ChatAvatar from "./parts/ChatAvatar";
import ChatLatestMessage from "./parts/ChatLatestMessage";
import TextLight from "components/text/TextLight";
import renderTime from "utils/renderTime";

function formatTime(time = "") {
  if (time.includes("previous")) {
    const item = time.split(" ");
    return item[0] + item[1].slice(0, 1) + " previous";
  }
  return time;
}

const ChatItem = ({
  id = "",
  avatar,
  username,
  latestMessage = "",
  isActive,
  createdAt,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/chats/t/" + id)}
      className="flex items-center justify-between px-4 transition-all rounded-md cursor-pointer hover:dark:bg-darkSoft hover:bg-whiteSoft"
    >
      <div className="flex items-start py-3 gap-x-4">
        <ChatAvatar
          avatar={avatar}
          size={50}
          alt={username}
          isActive={isActive}
        ></ChatAvatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <TextUsername>{username}</TextUsername>
            <TextLight className="text-text4 dark:text-text3 text-[13px]">
              {formatTime(renderTime(createdAt))}
            </TextLight>
          </div>
          <ChatLatestMessage>{latestMessage}</ChatLatestMessage>
        </div>
      </div>
      <div className="flex items-center"></div>
    </div>
  );
};

export default ChatItem;
