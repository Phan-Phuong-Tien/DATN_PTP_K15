import { Skeleton } from "@mui/material";
import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-4 mb-1 bg-transparent rounded-xl dark-skeleton">
      <div className="flex items-start py-3 gap-x-5">
        <Skeleton variant="circular" width={50} height={50} />
        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <Skeleton variant="text" sx={{ fontSize: "15px", width: "80px" }} />
            <Skeleton variant="text" sx={{ fontSize: "13px", width: "60px" }} />
          </div>
          <Skeleton variant="text" sx={{ fontSize: "14px", width: "200px" }} />
        </div>
      </div>
      <div className="flex items-center"></div>
    </div>
  );
};

export default ChatSkeleton;
