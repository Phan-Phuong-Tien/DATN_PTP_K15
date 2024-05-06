import PictureAvatarBig from "components/picture/PictureAvatarBig";
import TextUsername from "components/text/TextUsername";
import FriendStatus from "modules/friends/FriendStatus";
import React from "react";
import { Link } from "react-router-dom";

const NotifyFriend = ({ user }) => {
  return (
    <div className="flex items-start px-3 gap-x-2">
      <Link to={"/profile/" + user._id}>
        <PictureAvatarBig
          avatar={user.avatar}
          alt={user.email}
          size={60}
        ></PictureAvatarBig>
      </Link>
      <div className="flex flex-col gap-y-[10px]">
        <TextUsername>
          {user.firstName + " " + user.lastName}
          <span className="font-normal"> đã gửi một yêu cầu kết bạn.</span>
        </TextUsername>
        <div className="flex gap-x-3">
          <FriendStatus
            isSender={user.isSender}
            status={user.status}
            userID={user._id}
            className="px-5 py-2 min-w-[150px] font-semibold"
          ></FriendStatus>
        </div>
      </div>
    </div>
  );
};

export default NotifyFriend;
