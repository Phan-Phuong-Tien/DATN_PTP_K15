import { Skeleton } from "@mui/material";
import React from "react";

const CommentSkeleton = () => {
  return (
    <div className="flex items-start gap-x-3 dark-skeleton">
      <div className="w-[52px]">
        <Skeleton variant="circular" width={52} height={52} />
      </div>
      <div className="w-full">
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80px" }} />
        <Skeleton variant="text" sx={{ fontSize: "14px" }} />
        <Skeleton variant="text" sx={{ fontSize: "14px" }} />
        <Skeleton variant="text" sx={{ fontSize: "14px" }} />
      </div>
    </div>
  );
};

export default CommentSkeleton;
