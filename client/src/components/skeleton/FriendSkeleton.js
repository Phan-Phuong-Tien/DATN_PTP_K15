import React from "react";
import { Skeleton } from "@mui/material";

const FriendSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-between p-4 h-[300px] border rounded-xl border-strock dark:border-darkStroke dark-skeleton">
      <div className="flex flex-col items-center">
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" sx={{ fontSize: "18px", width: "100px" }} />
        <Skeleton variant="text" sx={{ fontSize: "14px", width: "150px" }} />
      </div>
      <div className="flex flex-col w-full gap-y-3">
        <Skeleton variant="rounded" sx={{ width: "100%", height: "34px" }} />
        <Skeleton variant="rounded" sx={{ width: "100%", height: "34px" }} />
      </div>
    </div>
  );
};

export default FriendSkeleton;
