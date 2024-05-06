import axios, { socket } from "api/config";
import Cookies from "js-cookie";
import { useState } from "react";

export default function useAddFriend(userID = "", status) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  // Send invitation
  const handleInvite = async () => {
    setLoadingBtn(true);
    try {
      await axios({
        method: "POST",
        url: "/friends/add/" + userID,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      setLoadingBtn(false);
      setNewStatus(2);
      socket.emit("send-notify-friend", userID);
    } catch (error) {
      throw new Error(error);
    }
  };

  //   Accept friend
  const handleAccept = async () => {
    setLoadingBtn(true);
    try {
      await axios({
        method: "PUT",
        url: "/friends/accept/" + userID,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      setLoadingBtn(false);
      setNewStatus(1);
    } catch (error) {
      throw new Error(error);
    }
  };

  //   Cancel friend
  const handleCancel = async () => {
    try {
      await axios({
        method: "DELETE",
        url: "/friends/cancel/" + userID,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      setNewStatus(3);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    loadingBtn,
    newStatus,
    handleInvite,
    handleAccept,
    handleCancel,
  };
}
