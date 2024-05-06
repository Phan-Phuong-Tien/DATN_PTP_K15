import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "api/config";
import Cookies from "js-cookie";

export const chatUserList = createAsyncThunk("chat/list", async () => {
  try {
    const res = await axios.get("/chats", {
      headers: {
        authorization: "Bearer " + Cookies.get("tokens"),
      },
    });
    let { username, listChat } = res.data;
    // eslint-disable-next-line array-callback-return
    listChat = listChat.map((user) => {
      if (user.show)
        return {
          ...user,
          participant: user.participant.filter(
            (i) => i._id !== username._id
          )[0],
        };
    });
    return listChat;
  } catch (error) {
    console.log(error);
  }
});

export const messageHistory = createAsyncThunk(
  "chat/message",
  async (chatID) => {
    try {
      const res = await axios.get("/chats/" + chatID, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      // console.log(res.data.participant);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
