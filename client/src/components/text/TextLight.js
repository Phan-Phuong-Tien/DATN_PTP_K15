import React from "react";

const TextLight = ({ children, className = "" }) => {
  return (
    <span
      className={`font-normal text-text3 dark:text-iconColor ${className}`}
      style={{ fontSize: "14px" }}
    >
      {children}
    </span>
  );
};

export default TextLight;
