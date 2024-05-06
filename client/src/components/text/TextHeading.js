import React from "react";

const TextHeading = ({ className = "", children }) => {
  return <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
};

export default TextHeading;
