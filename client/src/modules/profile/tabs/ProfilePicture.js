import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useBackdropPicture from "hooks/useBackropPicture";
import PictureDialog from "components/picture/PictureDialog";
import EmptyLayout from "layout/EmptyLayout";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuNavItem";
import axios from "api/config";
import Cookies from "js-cookie";
import AlertDialog from "components/alert/AlertDialog";
import { updateImageProfile } from "redux/users/userSlice";
import { Snackbar } from "@mui/material";
import useSnackbarInfo from "hooks/useSnackbarInfo";

const ProfilePicture = () => {
  let {
    userInfo: { listUpload },
    yourSelf,
    error,
  } = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();
  const { handleShowBackdrop, ...others } = useBackdropPicture();
  const { action, handleClose, stateOpen } = useSnackbarInfo();
  const [openAlert, setOpenAlert] = useState(false);
  const [position, setPosition] = useState(0);
  const [imageID, setImageID] = useState();
  const [open, setOpen] = stateOpen;
  if (!yourSelf) listUpload = listUpload.filter((item) => !item.private);
  if (error) return;
  const handleViewPicture = (i) => {
    if (listUpload.length > 0) {
      var uploads = [];
      for (const img of listUpload) uploads.push(img.link);
    }
    handleShowBackdrop(uploads);
    setPosition(i);
  };
  const handleDeleteImg = async () => {
    try {
      await axios.delete("/users/image/" + imageID, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      setOpen(true);
      dispatch(updateImageProfile(imageID));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {listUpload.length > 0 ? (
        <div className="grid grid-cols-4 px-4 my-5 gap-x-1">
          {listUpload.map((img, i) => (
            <div
              key={img._id}
              className={`relative ${
                img.private
                  ? "pointer-events-none opacity-30"
                  : "cursor-pointer group"
              }`}
            >
              <img
                key={img._id}
                src={img.link}
                className="h-[120px] object-cover "
                alt={img.name}
              />
              <div
                className="absolute inset-0 invisible bg-black bg-opacity-40 group-hover:visible"
                onClick={() => handleViewPicture(i)}
              ></div>
              {yourSelf && (
                <div className="absolute right-1 top-1">
                  <MenuNav>
                    <MenuNavItem>Tắt công khai</MenuNavItem>
                    <MenuNavItem
                      handleExtra={() => {
                        setOpenAlert(true);
                        setImageID(img._id);
                      }}
                    >
                      Xóa
                    </MenuNavItem>
                  </MenuNav>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyLayout
          linkImg="/img/profile-empty.png"
          info="Người dùng này không có bất kỳ hình ảnh nào"
          support="Vui lòng chuyển sang trang khác."
        ></EmptyLayout>
      )}
      <PictureDialog position={position} {...others}></PictureDialog>
      <AlertDialog
        textConfirm="Bạn có chắc chắn muốn xóa?"
        handleExtra={handleDeleteImg}
        open={openAlert}
        setOpen={setOpenAlert}
      ></AlertDialog>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={"Đã xóa hình ảnh thành công"}
        action={action}
      />
    </div>
  );
};

export default ProfilePicture;
