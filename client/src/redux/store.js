import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/userSlice";
import postReducer from "./posts/postSlice";
import commentSlice from "./comments/commentSlice";
import chatSlice from "./chats/chatSlice";
import notifySlice from "./notify/notifySlice";

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    users: userReducer,
    posts: postReducer,
    comments: commentSlice,
    notify: notifySlice,
    chats: chatSlice,
  }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware(),
});
