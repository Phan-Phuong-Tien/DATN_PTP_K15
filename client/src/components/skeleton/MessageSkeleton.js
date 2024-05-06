import { Skeleton } from "@mui/material";
import React from "react";

const MessageSkeleton = ({ yourself = false }) => {
  return (
    <div
      className={`flex dark-skeleton ${
        yourself && "flex-row-reverse"
      } items-start gap-x-2 group`}
    >
      <Skeleton variant="circular" className="mt-2" width={20} height={20} />
      <Skeleton
        variant="rounded"
        className="rounded-xl"
        width={220}
        height={40}
      />
    </div>
  );
};

export default MessageSkeleton;
