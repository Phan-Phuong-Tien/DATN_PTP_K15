import { createSlice } from "@reduxjs/toolkit";
import { addNewComment, getCommentList } from "./commentRequest";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    getComment: {
      listComment: [],
      loading: false,
      error: false,
    },
    addComment: {
      success: false,
      loading: false,
      error: null,
    },
  },
  reducers: {
    newComment: (state, { payload }) => {
      state.getComment.listComment.unshift(payload);
    },
    deleteComment: (state, { payload }) => {
      const { listComment } = state.getComment;
      state.getComment.listComment = listComment.filter(
        (comment) => comment._id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentList.fulfilled, (state, { payload }) => {
        state.getComment.listComment = payload;
        state.getComment.loading = false;
      })
      .addCase(getCommentList.pending, (state) => {
        state.getComment.loading = true;
        state.getComment.error = false;
      })
      .addCase(getCommentList.rejected, (state) => {
        state.getComment.loading = false;
        state.getComment.error = true;
      });
    builder
      .addCase(addNewComment.fulfilled, (state) => {
        state.addComment.success = true;
        state.addComment.loading = false;
      })
      .addCase(addNewComment.pending, (state) => {
        state.addComment.loading = true;
        state.addComment.error = null;
      })
      .addCase(addNewComment.rejected, (state, { payload }) => {
        state.addComment.loading = false;
        state.addComment.error = payload;
      });
  },
});

export const { newComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
