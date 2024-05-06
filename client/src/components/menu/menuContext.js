import useToggle from "hooks/useToggle";
import { createContext, useContext, useEffect, useRef } from "react";

const MenuContext = createContext();
function MenuProvider({ ...props }) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useToggle();

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const value = { open, setOpen, anchorRef, handleClose, handleListKeyDown };

  return (
    <MenuContext.Provider value={value} {...props}>
      {props.children}
    </MenuContext.Provider>
  );
}

function useMenuNav() {
  const context = useContext(MenuContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}

export { useMenuNav, MenuProvider };
