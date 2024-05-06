import React from "react";
import ButtonMenu from "components/button/ButtonMenu";
import { MenuProvider } from "./menuContext";
import MenuPopper from "./MenuPopper";

const MenuNav = ({ children, ...props }) => {
  return (
    <MenuProvider>
      <ButtonMenu></ButtonMenu>
      <MenuPopper {...props}>{children}</MenuPopper>
    </MenuProvider>
  );
};

export default MenuNav;
