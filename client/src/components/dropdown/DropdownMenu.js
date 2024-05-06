import React from "react";

const DropdownMenu = ({ children }) => {
  return (
    <ul className="absolute left-0 z-30 w-full py-[6px] scroll-custom max-h-[150px] overflow-auto transition-all translate-y-1 rounded-md shadow-xl bg-whiteSoft2 dark:bg-darkSecondary top-full">
      {children}
    </ul>
  );
};

export default DropdownMenu;
