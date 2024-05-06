import React from "react";
import useAddFriend from "hooks/useAddFriend";
import { Button, CircularProgress } from "@mui/material";

const FriendStatus = ({ className = "", status, isSender, userID }) => {
  const classGeneral = `${className} capitalize rounded-full`;
  const { loadingBtn, newStatus, handleInvite, handleCancel, handleAccept } =
    useAddFriend(userID, status);
  switch (newStatus) {
    case 1:
      return (
        <Button
          variant="outlined"
          className={`${classGeneral} hover:bg-graySoft hover:dark:bg-gray-700 text-primary border-primary`}
          onClick={handleCancel}
        >
          Hủy kết bạn
        </Button>
      );

    case 2: {
      if (!isSender)
        return (
          <>
            <Button
              variant="contained"
              className={`${classGeneral} bg-primary text-white ${
                loadingBtn && "pointer-events-none"
              }`}
              onClick={handleAccept}
            >
              {loadingBtn ? (
                <CircularProgress
                  style={{ width: "24px", height: "24px" }}
                  className="text-whiteSoft2 opacity-80"
                />
              ) : (
                "Chấp nhận"
              )}
            </Button>
            <Button
              variant="contained"
              className={
                classGeneral +
                "  bg-strock text-text1 dark:bg-darkStroke dark:text-white"
              }
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
          </>
        );
      return (
        <Button
          variant="contained"
          className={classGeneral + " bg-primary text-white"}
          onClick={handleCancel}
        >
          Đang chờ...
        </Button>
      );
    }

    default:
      return (
        <Button
          variant="contained"
          className={`${classGeneral} bg-primary text-white ${
            loadingBtn && "pointer-events-none"
          }`}
          onClick={handleInvite}
        >
          {loadingBtn ? (
            <CircularProgress
              style={{ width: "24px", height: "24px" }}
              className="text-whiteSoft2 opacity-80"
            />
          ) : (
            "Kết bạn"
          )}
        </Button>
      );
  }
};

export default FriendStatus;
