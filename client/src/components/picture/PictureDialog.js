import React from "react";
import PropTypes from "prop-types";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Backdrop, CircularProgress } from "@mui/material";

const PictureDialog = ({ position, openState, pictureState }) => {
  const [openBackdrop, setOpenBackdrop] = openState;
  const [pictures, setPictures] = pictureState;
  const listImg = pictures;
  const handleClickBackdrop = (e) => {
    const classNameElement = e.target.className;
    if (
      classNameElement.includes("swiper-button-next") ||
      classNameElement.includes("swiper-button-prev") ||
      classNameElement.includes("picture-backdrop")
    )
      setOpenBackdrop(true);
    else {
      setOpenBackdrop(false);
      setPictures();
    }
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackdrop}
      onClick={handleClickBackdrop}
    >
      {!listImg || listImg.length === 0 ? (
        <CircularProgress color="inherit" />
      ) : (
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="swiper-backdrop"
          slidesPerView={1}
          initialSlide={position || 0}
          allowTouchMove={false}
        >
          {listImg.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt=""
                className="max-h-[90vh] min-h-[70vh] max-w-[80vw] object-cover mx-auto picture-backdrop"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Backdrop>
  );
};

PictureDialog.propTypes = {
  openState: PropTypes.any,
  pictureState: PropTypes.any,
};

export default PictureDialog;
