import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SearchHistory from "./SearchHistory";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useLocation } from "react-router-dom";

const Search = ({
  onChange = () => {},
  placeholder = "Tìm kiếm ở đây",
  isSuggested = true,
  className = "py-4",
  icon = "search",
  ...props
}) => {
  const [focus, setFocus] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    setFocus(false);
  }, [location.pathname]);

  return (
    <ClickAwayListener onClickAway={() => setFocus(false)}>
      <div className="relative z-50">
        <label
          className={`flex items-center w-full pl-4 overflow-hidden rounded-full ${
            focus ? "border border-primary" : "bg-whiteSoft2 dark:bg-darkSoft2"
          }`}
        >
          {icon === "search" ? (
            <SearchOutlinedIcon
              className={`text-[22px] ${
                focus ? "text-primary" : "text-iconColor"
              }`}
            ></SearchOutlinedIcon>
          ) : (
            <PersonSearchIcon
              className={`text-[22px] ${
                focus ? "text-primary" : "text-iconColor"
              }`}
            ></PersonSearchIcon>
          )}
          <input
            type="text"
            onChange={onChange}
            placeholder={placeholder}
            className={`flex-1 px-3  bg-transparent text-sm ${className}`}
            onFocus={() => setFocus(!focus)}
            {...props}
          />
        </label>
        {isSuggested && focus && (
          <SearchHistory stateFocus={[focus, setFocus]}></SearchHistory>
        )}
      </div>
    </ClickAwayListener>
  );
};

Search.propTypes = {
  isSuggested: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.oneOf(["search", "user"]),
};

export default Search;
