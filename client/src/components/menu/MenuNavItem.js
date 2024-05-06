import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useMenuNav } from "./menuContext";

const MenuNavItem = ({ children, handleExtra = () => {} }) => {
  const { setOpen } = useMenuNav();
  const handleClick = () => {
    setOpen();
    handleExtra();
  };
  return <MenuItem onClick={handleClick}>{children}</MenuItem>;
};

export default MenuNavItem;
