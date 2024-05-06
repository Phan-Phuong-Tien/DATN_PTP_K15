import React from "react";
import TextLight from "./TextLight";

const TextInfo = ({ children, content = "", className = "" }) => {
  return (
    <div
      className={`flex items-start text-text3 dark:text-text-4 gap-x-2 ${className}`}
    >
      {children}
      <TextLight>{content}</TextLight>
    </div>
  );
};

export default TextInfo;
