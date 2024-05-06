import axios from "api/config";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRefresh } from "redux/auth/authSlice";

export default function useCheckLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth.login);
  const tokens = Cookies.get("tokens");
  useEffect(() => {
    if (tokens) {
      async function getUserByToken(id) {
        const res = await axios.get("/users/" + id, {
          headers: {
            authorization: "Bearer " + tokens,
          },
        });
        const { userInfo, yourSelf } = res.data;
        yourSelf && dispatch(loginRefresh(userInfo));
      }
      const decodedToken = jwtDecode(tokens);
      if (decodedToken) getUserByToken(decodedToken._id);
      else navigate("/login");
      window.scrollTo(0, 0);
    } else navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { currentUser };
}
