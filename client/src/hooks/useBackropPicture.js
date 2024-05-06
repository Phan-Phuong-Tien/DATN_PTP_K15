import { useState } from "react";

export default function useBackdropPicture() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [pictures, setPictures] = useState();
  const handleShowBackdrop = (data) => {
    setOpenBackdrop(true);
    setPictures(typeof data === "string" ? [data] : data);
  };
  return {
    openState: [openBackdrop, setOpenBackdrop],
    pictureState: [pictures, setPictures],
    handleShowBackdrop,
  };
}
