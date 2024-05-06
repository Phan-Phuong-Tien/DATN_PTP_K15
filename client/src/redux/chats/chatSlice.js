import { createSlice } from "@reduxjs/toolkit";
import { chatUserList, messageHistory } from "./chatRequest";

const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chatInfo: {
      loading: false,
      listUserActive: null,
      listChats: [],
      error: null,
    },
    messageInfo: {
      listMessage: [],
      participant: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    addUserActive: (state, { payload }) => {
      state.chatInfo.listUserActive = payload;
    },
    removeUserActive: (state, { payload }) => {
      state.chatInfo.listUserActive.filter((user) => user._id !== payload);
    },
    addMessage: (state, { payload }) => {
      state.messageInfo.listMessage.push(payload);
    },
    removeMessage: (state, { payload }) => {
      state.messageInfo.listMessage = state.messageInfo.listMessage
        .filter((mess) => mess._id !== payload._id)
        // eslint-disable-next-line array-callback-return
        .map((mess) => {
          return mess.reply && payload._id === mess.reply.id
            ? { ...mess, reply: null }
            : mess;
        });
    },
    newChatList: (state, { payload }) => {
      state.chatInfo.listChats = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chatUserList.fulfilled, (state, { payload }) => {
        state.chatInfo.listChats = payload;
        state.chatInfo.loading = false;
      })
      .addCase(chatUserList.pending, (state) => {
        state.chatInfo.loading = true;
        state.chatInfo.error = null;
      })
      .addCase(chatUserList.rejected, (state, { payload }) => {
        state.chatInfo.loading = false;
        state.chatInfo.error = payload;
      });
    builder
      .addCase(
        messageHistory.fulfilled,
        (state, { payload: { listMessage, participant } }) => {
          state.messageInfo.listMessage = listMessage;
          state.messageInfo.participant = participant;
          state.messageInfo.loading = false;
        }
      )
      .addCase(messageHistory.pending, (state) => {
        state.messageInfo.loading = true;
        state.messageInfo.error = null;
      })
      .addCase(messageHistory.rejected, (state, { payload }) => {
        state.messageInfo.loading = false;
        state.messageInfo.error = payload;
      });
  },
});

export const {
  addUserActive,
  removeUserActive,
  addMessage,
  removeMessage,
  newChatList,
} = chatSlice.actions;

export default chatSlice.reducer;
