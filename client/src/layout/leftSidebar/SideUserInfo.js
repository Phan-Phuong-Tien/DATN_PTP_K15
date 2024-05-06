import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "redux/auth/authRequest";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuNavItem";
import TextLight from "components/text/TextLight";
import { socket } from "api/config";
import { Skeleton } from "@mui/material";
import useToggle from "hooks/useToggle";
import Overlay from "components/common/Overlay";
import ModalHeading from "components/modal/ModalHeading";
import ModalLine from "components/modal/ModalLine";

const SideUserInfo = ({
  url = "/profile/",
  avatar,
  username = "",
  email = "",
  children,
}) => {
  const dispatch = useDispatch();
  const [modalPassword, setModalPassword] = useToggle(false);
  const { currentUser } = useSelector((state) => state.auth.login);
  const handleLogout = () => {
    logoutUser(dispatch);
    socket.emit("logout-active", currentUser);
  };
  return (
    <>
      <div className="flex items-center justify-between dark-skeleton">
        <Link to={url} className="flex items-center gap-x-3 w-fit">
          {avatar ? (
            <Avatar
              alt={username}
              src={avatar}
              sx={{ width: 48, height: 48 }}
            />
          ) : (
            <Skeleton variant="circular" width={48} height={48} />
          )}
          <div>
            {username ? (
              <h3 className="text-[15px] font-semibold">
                {username.length > 10
                  ? username.slice(0, 14) + "..."
                  : username}
              </h3>
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "15px", width: "50px" }}
              />
            )}
            {email ? (
              <TextLight>
                {email?.length > 15 ? email.slice(0, 15) + "..." : email}
              </TextLight>
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "14px", width: "100px" }}
              />
            )}
          </div>
        </Link>
        <div>
          <MenuNav>
            <MenuNavItem handleExtra={setModalPassword}>
              Thay đổi mật khẩu
            </MenuNavItem>
            <MenuNavItem handleExtra={handleLogout}>Đăng xuất</MenuNavItem>
          </MenuNav>
        </div>
      </div>
      {modalPassword && (
        <Overlay handleHideModal={setModalPassword} alignCenter={true}>
          <div className="w-[550px] mx-auto bg-white dark:bg-darkSoft z-50 rounded-xl show-modal">
            <ModalHeading handleHideModal={setModalPassword}>
              Thay đổi mật khẩu
            </ModalHeading>
            <ModalLine />
            {children}
          </div>
        </Overlay>
      )}
    </>
  );
};

SideUserInfo.propTypes = {
  url: PropTypes.string,
  avatar: PropTypes.string,
};

export default SideUserInfo;
