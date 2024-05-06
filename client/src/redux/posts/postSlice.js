import { createSlice } from "@reduxjs/toolkit";
import { addNewPost, getPostList } from "./postRequest";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    getPost: {
      listPost: [],
      loading: true,
      error: null,
    },
    createPost: {
      success: false,
      loading: false,
      error: false,
    },
  },
  reducers: {
    setModeComment: (state, { payload }) => {
      // eslint-disable-next-line array-callback-return
      state.getPost.listPost = state.getPost.listPost.map((post) =>
        post._id === payload
          ? { ...post, modeComment: !post.modeComment }
          : { ...post }
      );
    },
    deletePost: (state, { payload }) => {
      state.getPost.listPost = state.getPost.listPost.filter(
        (post) => post._id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.fulfilled, (state) => {
        state.createPost.success = true;
        state.createPost.loading = false;
      })
      .addCase(addNewPost.pending, (state) => {
        state.createPost.loading = true;
        state.createPost.error = false;
      })
      .addCase(addNewPost.rejected, (state) => {
        state.createPost.loading = false;
        state.createPost.error = true;
      });
    builder
      .addCase(getPostList.fulfilled, (state, { payload }) => {
        state.getPost.listPost = payload;
        state.getPost.loading = false;
      })
      .addCase(getPostList.pending, (state) => {
        state.getPost.loading = true;
        state.getPost.error = null;
      })
      .addCase(getPostList.rejected, (state, payload) => {
        state.getPost.loading = false;
        state.getPost.error = payload;
      });
  },
});

export const { setModeComment, deletePost } = postSlice.actions;

export default postSlice.reducer;
