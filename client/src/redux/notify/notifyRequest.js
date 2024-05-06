import axios from "api/config";
import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import verifyFriend from "utils/verifyFriend";
import { removeNotify } from "./notifySlice";

export const notifyList = createAsyncThunk("notify/list", async () => {
  try {
    const res = await axios.get("/notify/list", {
      headers: {
        authorization: "Bearer " + Cookies.get("tokens"),
      },
    });
    let { listNotify, listUserFriend, listUser } = res.data;
    listUser = listUser
      .map((user) => verifyFriend(listUserFriend, user))
      .filter((user) => user.status === 2 && !user.isSender);
    listNotify = listNotify.map((item) => {
      if (item.type === "comment") return { ...item, icon: "/img/comment.png" };
      let icon = "";
      switch (item.postID.type) {
        case "video":
          icon = "/img/facebook.png";
          break;

        case "image":
          icon = "/img/photo.png";
          break;

        default:
          icon = "/img/content.png";
          break;
      }
      return { ...item, icon };
    });
    return {
      listUser,
      listNotify,
      countNotSeen:
        listUser.length + listNotify.filter((item) => !item.seen).length,
    };
  } catch (error) {
    throw new Error(error);
  }
});

export const notifySeen = createAsyncThunk("notify/seen", async (path = "") => {
  try {
    await axios.post(
      "/notify/" + path,
      {},
      {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
});

export const notifyRemove = createAsyncThunk(
  "notify/remove",
  async ({ _id, dispatch, setTextAlert, setOpen }) => {
    try {
      const res = await axios.delete("/notify/" + _id, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      dispatch(removeNotify(res.data?._id));
      setTextAlert("The notification has been removed");
      setOpen(true);
    } catch (error) {
      throw new Error(error);
    }
  }
);
