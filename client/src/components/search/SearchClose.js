import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const SearchClose = ({ onClick = () => {} }) => {
  return (
    <div
      className="flex items-center justify-center w-8 h-8 transition-all rounded-full hover:bg-primary hover:bg-opacity-10 hover:dark:bg-opacity-25"
      onClick={onClick}
    >
      <CloseIcon className="text-xl text-primary"></CloseIcon>
    </div>
  );
};

SearchClose.propTypes = {
  onClick: PropTypes.func,
};

export default SearchClose;
