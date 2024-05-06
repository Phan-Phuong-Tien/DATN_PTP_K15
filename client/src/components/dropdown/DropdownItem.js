import React from "react";

const DropdownItem = ({ children, className = "", onClick = () => {} }) => {
  return (
    <li
      className={`px-5 py-2 transition-all cursor-pointer dark:text-white hover:bg-graySoft hover:dark:bg-darkSoft ${className}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default DropdownItem;
