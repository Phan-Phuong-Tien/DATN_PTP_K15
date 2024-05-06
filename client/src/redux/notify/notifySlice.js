import { createSlice } from "@reduxjs/toolkit";
import { notifyList } from "./notifyRequest";

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    countNotSeen: 0,
    listNotify: [],
    listUsers: [],
  },
  reducers: {
    removeNotify: (state, { payload }) => {
      state.listNotify = state.listNotify.filter(
        (notify) => notify._id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(notifyList.fulfilled, (state, { payload }) => {
      state.listNotify = payload.listNotify;
      state.countNotSeen = payload.countNotSeen;
      state.listUsers = payload.listUser;
    });
  },
});

export const { removeNotify } = notifySlice.actions;

export default notifySlice.reducer;
