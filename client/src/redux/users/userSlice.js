import { createSlice } from "@reduxjs/toolkit";
import { updateUserProfile, userFriend, userProfile } from "./userRequest";

const initProfile = {
  loading: true,
  userInfo: null,
  yourSelf: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    profile: initProfile,
    friend: {
      loading: true,
      error: null,
      listUsers: [],
      filters: {},
    },
    alertInfo: {
      type: "success",
      message: null,
    },
    searchHistory: null,
  },
  reducers: {
    filterUser: (state, { payload }) => {
      state.friend.filters = { ...state.friend.filters, ...payload };
    },
    resetProfile: (state) => {
      state.profile = initProfile;
    },
    getSearchHistory: (state, { payload }) => {
      state.searchHistory = payload.slice(0, 5);
    },
    updateImageProfile: (state, { payload }) => {
      const { userInfo } = state.profile;
      if (userInfo)
        state.profile.userInfo.listUpload = userInfo.listUpload.filter(
          (img) => img._id !== payload
        );
    },
  },
  extraReducers: (builder) => {
    // Personal profile
    builder
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        state.profile.loading = false;
        state.profile.userInfo = payload?.userInfo;
        state.profile.yourSelf = payload?.yourSelf;
        state.profile.error = false;
      })
      .addCase(userProfile.pending, (state) => {
        state.profile.loading = true;
        state.profile.error = false;
      })
      .addCase(userProfile.rejected, (state, { payload }) => {
        state.profile.loading = false;
        state.profile.error = payload;
      });

    // Friend list
    builder
      .addCase(userFriend.fulfilled, (state, { payload }) => {
        state.friend.listUsers = payload;
        state.friend.loading = false;
      })
      .addCase(userFriend.pending, (state) => {
        state.friend.loading = true;
        state.friend.error = false;
      })
      .addCase(userFriend.rejected, (state, { payload }) => {
        state.friend.loading = false;
        state.friend.error = payload;
      });

    builder
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.profile.loading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.profile.loading = true;
      });
  },
});

export const {
  resetProfile,
  filterUser,
  getSearchHistory,
  updateImageProfile,
} = userSlice.actions;

export default userSlice.reducer;
