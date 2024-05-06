import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import LoginPage from "views/LoginPage";
import RegisterPage from "views/RegisterPage";
import HomePage from "views/HomePage";
import FriendPage from "views/FriendPage";
import FilterPage from "views/FilterPage";
import ProfilePage from "views/ProfilePage";
import PostDetailPage from "views/PostDetailPage";
import ChatPage from "views/ChatPage";
import SavedPage from "views/SavedPage";
import NotifyPage from "views/NotifyPage";
import MessagePage from "views/MessagePage";
import NotFoundPage from "views/NotFoundPage";
import MainLayout from "layout/MainLayout";
import ForgotPassPage from "views/ForgotPass";


function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/forgot" element={<ForgotPassPage/>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/friends" element={<FriendPage></FriendPage>}></Route>
          <Route path="/notify" element={<NotifyPage />}></Route>
          <Route
            path="/profile/:id"
            element={<ProfilePage></ProfilePage>}
          ></Route>
          <Route
            path="/post/:id"
            element={<PostDetailPage></PostDetailPage>}
          ></Route>
          <Route path="/search" element={<FilterPage></FilterPage>}></Route>
          <Route path="/post-saved" element={<SavedPage></SavedPage>}></Route>
          <Route path="/chats" element={<ChatPage />}></Route>
          <Route path="/chats/t/:id" element={<MessagePage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
