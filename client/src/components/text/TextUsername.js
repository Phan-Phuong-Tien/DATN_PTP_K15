import React from "react";

const TextUsername = ({ children, className = "", type = "light" }) => {
  if (type === "bold")
    return <h4 className={`font-bold leading-6 ${className}`}>{children}</h4>;
  return <p className={`text-[15px] font-semibold ${className}`}>{children}</p>;
};

export default TextUsername;
