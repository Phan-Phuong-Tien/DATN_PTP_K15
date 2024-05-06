import React from "react";

const PictureCover = ({ src, onClick, children }) => {
  return (
    <>
      {children}
      <img
        src={src}
        onClick={onClick}
        className="w-full h-[250px] object-cover cursor-pointer"
        alt=""
      />
    </>
  );
};

export default PictureCover;
