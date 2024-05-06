import axios from "api/config";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { getSearchHistory } from "redux/users/userSlice";
import SearchClose from "./SearchClose";

const SearchSuggest = ({ children, onClick }) => {
  const dispatch = useDispatch();

  const handleRemoveSearch = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios({
        method: "DELETE",
        url: "/users/search/remove?keyword=" + children,
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      dispatch(getSearchHistory(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li
      className="flex items-center justify-between p-4 transition-all cursor-pointer hover:dark:bg-darkSoft hover:bg-whiteSoft"
      onClick={onClick}
    >
      {children}
      <SearchClose onClick={handleRemoveSearch}></SearchClose>
    </li>
  );
};

export default SearchSuggest;
