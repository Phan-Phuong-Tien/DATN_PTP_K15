import React, { useEffect } from "react";
import { socket } from "api/config";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SideNav from "./leftSidebar/SideNav";
import SideDarkMode from "./leftSidebar/SideDarkMode";
import SideUserInfo from "./leftSidebar/SideUserInfo";
import SideContact from "./rightSidebar/SideContact";
import SideFilter from "./rightSidebar/SideFilter";
import SideFriend from "./rightSidebar/SideFriend";
import useCheckLogin from "hooks/useCheckLogin";
import { addUserActive } from "redux/chats/chatSlice";
import SideSearchInput from "./rightSidebar/SideSearchInput";
import SidePassword from "./leftSidebar/SidePassword";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const MainLayout = () => {
  const { currentUser } = useCheckLogin();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.connect();

    socket.on("receive-notify-message", (userID) => {
      const decodedToken = jwtDecode(Cookies.get("tokens"));
      if (userID === decodedToken?._id) {
        const audio = new Audio("/audio/new-message.mp3");
        audio.play();
        if (!location.pathname.includes("/chats")) {
          toast.info("Bạn có 1 tin nhắn mới", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
    
    socket.on("user-active", (data) => {
      dispatch(addUserActive(data));
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (currentUser) {
      setInterval(() => {
        socket.emit("client-connect", currentUser);
      }, 5000);
      window.addEventListener("beforeunload", () => {
        socket.emit("client-disconnect", currentUser);
      });
    }
  }, [currentUser]);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="relative flex items-start justify-between gap-x-8">
        <div className="sticky top-0 h-[100vh] flex-[1] flex flex-col justify-between z-[120] py-8">
          <div>
            <Link
              to={"/home"}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="flex items-center gap-x-4"
            >
              <img src="/logoFC.png" alt="" className="w-10 h-10" />
              <h3 className="text-2xl font-bold text-text2 dark:text-text4">
                FreshConnect
              </h3>
            </Link>
            <SideNav></SideNav>
          </div>
          <div>
            <SideDarkMode></SideDarkMode>
            <SideUserInfo
              avatar={currentUser?.avatar}
              username={
                currentUser &&
                currentUser?.firstName + " " + currentUser?.lastName
              }
              email={currentUser?.email}
              url={"/profile/" + currentUser?._id}
            >
              <SidePassword />
            </SideUserInfo>
          </div>
        </div>
        <div className="flex-[2.5] border-b border-x border-graySoft dark:border-gray-700 min-h-screen">
          <Outlet></Outlet>
        </div>
        <div className="sticky top-0 flex-[1.5] z-40 overflow-auto h-[100vh] py-4 scroll-custom">
          <SideSearchInput />
          <RightContainer path={location.pathname} />
        </div>
      </div>
    </div>
  );
};

const RightContainer = ({ path }) => {
  switch (path) {
    case "/friends":
      return <SideFriend></SideFriend>;

    case "/search":
      return <SideFilter></SideFilter>;

    default:
      return <SideContact></SideContact>;
  }
};

export default MainLayout;
