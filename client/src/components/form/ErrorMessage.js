import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ children, className = "" }) => {
  return (
    <span
      className={`absolute text-[13px] bottom-0 translate-y-full text-errorColor ${className}`}
    >
      {children}
    </span>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.string,
};

export default ErrorMessage;
