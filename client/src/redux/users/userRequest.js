import axios from "api/config";
import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import verifyFriend from "utils/verifyFriend";
import { loginRefresh } from "redux/auth/authSlice";

export const userProfile = createAsyncThunk(
  "user/info",
  async (userID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await axios.get("/users/" + userID, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      let { userInfo, postCount, yourSelf, listFriend } = res.data;
      if (!yourSelf) userInfo = verifyFriend(listFriend, userInfo);
      return fulfillWithValue({
        userInfo: {
          ...userInfo,
          postCount,
        },
        yourSelf: yourSelf,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userFriend = createAsyncThunk(
  "users/friend",
  async (
    { name, gender = "", status },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `/users?name=${name || ""}&gender=${gender}`,
        {
          headers: {
            authorization: "Bearer " + Cookies.get("tokens"),
          },
        }
      );
      let { listUser, listFriend } = res?.data;
      listUser = listUser.map((user) => verifyFriend(listFriend, user));
      if (status) listUser = listUser.filter((user) => user.status === status);
      return fulfillWithValue([
        ...listUser.filter((user) => user.status === 2),
        ...listUser.filter((user) => user.status !== 2),
      ]);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/update",
  async ({ data, userID, dispatch }) => {
    try {
      var formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (value) formData.append(key, value);
      }

      const res = await axios({
        method: "PUT",
        url: "/users/update-info",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      toast.success("Update successfully profile", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(userProfile(userID));
      dispatch(loginRefresh(res?.data));
      return 1;
    } catch (err) {
      toast.error("Failed. Please try again!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      throw new Error(err);
    }
  }
);
