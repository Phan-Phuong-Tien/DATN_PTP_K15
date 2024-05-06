import TextUsername from "components/text/TextUsername";
import React from "react";
import { useNavigate } from "react-router-dom";
import ChatAvatar from "./parts/ChatAvatar";

const ChatItemActive = ({ userInfo, chatId = "" }) => {
  const { firstName, lastName, avatar } = userInfo;
  const navigate = useNavigate();
  const fullName = `${firstName} ${lastName}`;
  return (
    <div
      onClick={() => navigate("/chats/t/" + chatId)}
      className="flex flex-col items-center p-2 rounded-lg cursor-pointer gap-y-2 hover:bg-whiteSoft hover:dark:bg-darkSoft"
      alt={fullName}
    >
      <ChatAvatar avatar={avatar} isActive={true}></ChatAvatar>
      <TextUsername className="line-clamp-2">
        {fullName.slice(0, 6) + "..."}
      </TextUsername>
    </div>
  );
};

export default ChatItemActive;
