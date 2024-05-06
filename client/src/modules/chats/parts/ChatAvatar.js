import { Avatar } from "@mui/material";
import React from "react";

const ChatAvatar = ({ isActive = false, avatar, alt = "", size = 60 }) => {
  return (
    <div className="relative">
      <Avatar
        alt={alt}
        src={avatar}
        sx={{ width: size, height: size }}
      ></Avatar>
      {isActive && (
        <div className="absolute bottom-0 right-0 w-[18px] h-[18px] rounded-full bg-successColor"></div>
      )}
    </div>
  );
};

export default ChatAvatar;
