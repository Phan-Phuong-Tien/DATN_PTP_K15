import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authRequest";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isLoading: false,
    },
    register: { isLoading: false, success: false },
  },
  reducers: {
    logoutAccount: (state) => {
      state.login.currentUser = null;
    },
    loginRefresh: (state, { payload }) => {
      state.login.currentUser = payload;
    },
    resetRegister: (state) => {
      state.register.success = false;
    },
  },
  extraReducers: (builder) => {
    /* Login */
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.login.currentUser = payload;
        state.login.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.login.isLoading = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.login.isLoading = false;
      });
    /* Register */
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.register.isLoading = false;
        state.register.success = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.register.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.register.isLoading = false;
      });
  },
});

export const { loginRefresh, logoutAccount, resetRegister } = authSlice.actions;

export default authSlice.reducer;
