import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const ModalHeading = ({ handleHideModal, children }) => {
  return (
    <div className="relative flex items-center h-[60px] justify-center px-5">
      <h3 className="w-fit text-[22px] font-bold">{children}</h3>
      <div
        className="absolute flex items-center justify-center transition-all bg-transparent rounded-full cursor-pointer w-9 h-9 top-1/2 -translate-y-2/4 text-iconColor hover:bg-graySoft hover:dark:bg-gray-600 right-5"
        onClick={handleHideModal}
      >
        <CloseIcon sx={{ fontSize: "24px" }}></CloseIcon>
      </div>
    </div>
  );
};

export default ModalHeading;
