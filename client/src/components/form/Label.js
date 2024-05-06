import React from "react";
import PropTypes from "prop-types";

const Label = ({ className = "", name = "", children }) => {
  return (
    <label
      htmlFor={name}
      className={`text-base font-medium text-text2 dark:text-text3 cursor-pointer w-fit ${className}`}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Label;
