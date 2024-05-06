import React from "react";
import useBackdropPicture from "hooks/useBackropPicture";
import ButtonGradient from "components/button/ButtonGradient";
import PictureDialog from "components/picture/PictureDialog";

const PostImage = ({ src = "", listImg = [] }) => {
  const { openState, pictureState, handleShowBackdrop } = useBackdropPicture();
  return (
    <>
      <div className="relative w-full overflow-hidden rounded-lg group">
        <img
          src={src}
          onClick={() => handleShowBackdrop(listImg)}
          className="object-cover w-full max-h-[500px] cursor-pointer group-hover:opacity-80 transition-all"
          alt=""
        />
        {listImg.length > 1 && (
          <>
            <div className="absolute inset-0 transition-all duration-[350ms] bg-white bg-opacity-0 group-hover:bg-opacity-50"></div>
            <div className="absolute -bottom-full opacity-0 group-hover:opacity-100 group-hover:bottom-10 duration-[400ms] transition-all left-1/2 w-[40%] -translate-x-2/4">
              <ButtonGradient
                className="w-full py-5 font-bold rounded-xl"
                onClick={() => handleShowBackdrop(listImg)}
              >
                See More (+{listImg.length - 1})
              </ButtonGradient>
            </div>
          </>
        )}
      </div>
      <PictureDialog
        openState={openState}
        pictureState={pictureState}
      ></PictureDialog>
    </>
  );
};

export default PostImage;
