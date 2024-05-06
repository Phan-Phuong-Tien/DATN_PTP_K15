import React from "react";
import Search from "components/search/Search";
import Cookies from "js-cookie";
import useChangeValue from "hooks/useChangeValue";
import axios from "api/config";
import { getSearchHistory } from "redux/users/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SideSearchInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value: query, handleChange } = useChangeValue("", 0);

  const handleEnterKey = async (e) => {
    try {
      if (e.which === 13 && query) {
        navigate("/search?q=" + query);
        const res = await axios({
          method: "POST",
          url: "/users/search?keyword=" + query,
          headers: {
            authorization: "Bearer " + Cookies.get("tokens"),
          },
        });
        dispatch(getSearchHistory(res?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Search onChange={handleChange} onKeyDown={handleEnterKey}></Search>;
};

export default SideSearchInput;
