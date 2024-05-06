import React from "react";
import { Skeleton } from "@mui/material";

const ProfileLoading = () => {
  return (
    <div className="dark-skeleton">
      <div className="relative">
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "250px" }}
        />
        <div className="absolute bottom-0 p-1 bg-white rounded-full cursor-pointer dark:bg-darkLite left-5 translate-y-2/4">
          <div className="relative">
            <Skeleton variant="circular" width={130} height={130} />
          </div>
        </div>
      </div>
      <div className="px-5 mt-[80px]">
        <Skeleton variant="text" sx={{ fontSize: "20px", width: "100px" }} />
        <Skeleton variant="text" sx={{ fontSize: "14px", width: "150px" }} />
      </div>
    </div>
  );
};

export default ProfileLoading;
