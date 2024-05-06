import React from "react";
import { Avatar, Skeleton } from "@mui/material";
import TextUsername from "components/text/TextUsername";

const MessageProfile = ({ userInfo = {}, loading = false }) => {
  const { avatar, firstName, lastName, email } = userInfo;
  return (
    <div className="flex flex-col items-center justify-center my-10">
      {loading ? (
        <div className="dark-skeleton">
          <Skeleton variant="circular" width={100} height={100} />
          <Skeleton
            variant="text"
            sx={{ fontSize: "22px", width: "60px", marginTop: "8px" }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "18px", width: "120px", marginTop: "4px" }}
          />
        </div>
      ) : (
        <>
          <Avatar src={avatar} sx={{ width: 100, height: 100 }}></Avatar>
          <TextUsername className="mt-2 text-xl" type="bold">
            {firstName + " " + lastName}
          </TextUsername>
          <span className="mt-1 text-base font-normal leading-5 text-text3">
            {email}
          </span>
        </>
      )}
    </div>
  );
};

export default MessageProfile;
