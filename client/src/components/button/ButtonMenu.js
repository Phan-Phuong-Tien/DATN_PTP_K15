import React from "react";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMenuNav } from "components/menu/menuContext";

const ButtonMenu = () => {
  const { open, anchorRef, setOpen } = useMenuNav();
  return (
    <Button
      ref={anchorRef}
      id="composition-button"
      aria-controls={open ? "composition-menu" : undefined}
      aria-expanded={open ? "true" : undefined}
      aria-haspopup="true"
      onClick={(e) => {
        e.stopPropagation();
        setOpen();
      }}
      sx={{
        minWidth: 0,
        padding: "6px",
        borderRadius: "50%",
        color: "#ccc",
        zIndex: 100,
      }}
    >
      <MoreHorizIcon className="text-iconColor"></MoreHorizIcon>
    </Button>
  );
};

ButtonMenu.propTypes = {
  // value: PropTypes.string
};

export default ButtonMenu;
