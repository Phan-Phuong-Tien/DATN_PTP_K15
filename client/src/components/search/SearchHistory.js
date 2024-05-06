import React, { useEffect } from "react";
import ButtonRemoveAll from "components/button/ButtonRemoveAll";
import SearchSuggest from "./SearchSuggest";
import SearchHeading from "./SearchHeading";
import { useDispatch, useSelector } from "react-redux";
import { getSearchHistory } from "redux/users/userSlice";
import Cookies from "js-cookie";
import axios from "api/config";
import { useNavigate } from "react-router-dom";
import EmptyLayout from "layout/EmptyLayout";

const SearchHistory = ({ stateFocus }) => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const [focus, setFocus] = stateFocus;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchHistory } = useSelector((state) => state.users);
  useEffect(() => {
    !searchHistory && dispatch(getSearchHistory(currentUser?.searchHistory));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveAllSearch = async () => {
    try {
      const res = await axios({
        method: "DELETE",
        url: "/users/search/all",
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      dispatch(getSearchHistory(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmpty = searchHistory && searchHistory.length > 0;

  return (
    <div className="absolute left-0 w-full overflow-hidden translate-y-2 bg-white border rounded-lg shadow-md dark:shadow-gray-500 dark:border-gray-700 dark:bg-darkSecondary border-graySoft top-full">
      <SearchHeading>
        {checkEmpty && (
          <ButtonRemoveAll onClick={handleRemoveAllSearch}>
            Clear All
          </ButtonRemoveAll>
        )}
      </SearchHeading>
      {checkEmpty ? (
        <ul className="flex flex-col">
          {searchHistory.map((keyword, i) => (
            <SearchSuggest
              key={i}
              onClick={() => {
                setFocus(false);
                navigate("/search?q=" + keyword);
              }}
            >
              {keyword}
            </SearchSuggest>
          ))}
        </ul>
      ) : (
        <EmptyLayout
          linkImg="/img/search-empty.png"
          className="h-[200px]"
          support="Bạn chưa tìm kiếm bất kỳ từ khóa nào"
        ></EmptyLayout>
      )}
    </div>
  );
};

export default SearchHistory;
