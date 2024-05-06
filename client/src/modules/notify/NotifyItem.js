import { Snackbar } from "@mui/material";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuNavItem";
import PictureAvatarBig from "components/picture/PictureAvatarBig";
import TextUsername from "components/text/TextUsername";
import useSnackbarInfo from "hooks/useSnackbarInfo";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { notifyRemove, notifySeen } from "redux/notify/notifyRequest";
import renderTime from "utils/renderTime";

const NotifyItem = ({ postID = "", userInfo = {}, notifyInfo = {} }) => {
  const dispatch = useDispatch();
  const { action, handleClose, stateOpen } = useSnackbarInfo();
  const [open, setOpen] = stateOpen;
  const [textAlert, setTextAlert] = useState("");
  const fullName = userInfo?.firstName + " " + userInfo?.lastName;
  const { _id, seen, title = "", icon, createdAt } = notifyInfo;
  const handleSeenNotify = () => {
    dispatch(notifySeen(_id));
  };
  const handleMarkSeen = () => {
    dispatch(notifySeen(_id + "?seen=1"));
    setTextAlert(seen ? "Mark unwatched" : "Mark watched");
    setOpen(true);
  };
  const handleRemoveNotify = () => {
    dispatch(notifyRemove({ dispatch, _id, setTextAlert, setOpen }));
  };
  if (!postID) return;
  return (
    <>
      <div className="relative transition-all rounded-lg cursor-pointer group hover:bg-graySoft hover:dark:bg-darkSoft">
        <Link
          to={"/post/" + postID}
          onClick={handleSeenNotify}
          className={`flex items-center justify-between p-3 gap-x-3`}
        >
          <div className="flex items-start gap-x-2">
            <PictureAvatarBig
              avatar={userInfo?.avatar}
              size={60}
              alt={fullName}
            >
              <img
                className="absolute bottom-0 right-0 w-6 h-6"
                src={icon}
                alt=""
              />
            </PictureAvatarBig>
            <div className="flex flex-col gap-y-[10px]">
              <TextUsername className="leading-5 line-clamp-3">
                {fullName}
                <span className="font-normal text-text2 dark:text-text4">
                  {" "}
                  {title}
                </span>
              </TextUsername>
              <p className="text-[13px] font-semibold text-primary">
                {renderTime(createdAt)}
              </p>
            </div>
          </div>
          <div className="px-1">
            <div
              className={`w-[14px] h-[14px] rounded-full group-hover:bg-opacity-40 ${
                !seen && "bg-primary"
              }`}
            ></div>
          </div>
        </Link>
        <div className="absolute rounded-full opacity-0 right-2 top-2 group-hover:opacity-100">
          <MenuNav>
            <MenuNavItem handleExtra={handleMarkSeen}>
              Đánh dấu {seen ? "không theo dõi" : "theo dõi"}
            </MenuNavItem>
            <MenuNavItem handleExtra={handleRemoveNotify}>
              Xóa thông báo này
            </MenuNavItem>
          </MenuNav>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={textAlert}
        action={action}
      />
    </>
  );
};

export default NotifyItem;
