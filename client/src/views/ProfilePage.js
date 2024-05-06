import React, { useEffect, useState } from "react";
import useTurnSwitch from "hooks/useTurnSwitch";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "redux/users/userRequest";
import { useNavigate, useParams } from "react-router-dom";
import BackPage from "components/common/BackPage";
import ProfileFeature from "modules/profile/ProfileFeature";
import ProfileGeneral from "modules/profile/ProfileGeneral";
import TextHeading from "components/text/TextHeading";
import TextLight from "components/text/TextLight";
import ProfileTabList from "modules/profile/ProfileTabList";
import PictureCover from "components/picture/PictureCover";
import ProfilePicture from "modules/profile/tabs/ProfilePicture";
import ProfilePost from "modules/profile/tabs/ProfilePost";
import ProfileFriend from "modules/profile/tabs/ProfileFriend";
import ProfileLike from "modules/profile/tabs/ProfileLike";
import PictureAvatarBig from "components/picture/PictureAvatarBig";
import Skeleton from "@mui/material/Skeleton";
import ProfileLoading from "modules/profile/ProfileLoading";
import PictureDialog from "components/picture/PictureDialog";
import useBackdropPicture from "hooks/useBackropPicture";
import { resetProfile } from "redux/users/userSlice";

const listTab = ["picture", "posts", "friends", "likes"];

const PersonalPage = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { keyName: tabName, switchTab } = useTurnSwitch("tab", "picture");
  const { handleShowBackdrop, ...others } = useBackdropPicture();
  useEffect(() => {
    dispatch(userProfile(id));
    return () => dispatch(resetProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const { loading, error, userInfo, yourSelf } = useSelector(
    (state) => state.users.profile
  );
  const [fullName, setFullName] = useState("");
  fullName && (document.title = fullName + " | FreshConnect");
  useEffect(() => {
    if (userInfo) setFullName(`${userInfo?.firstName} ${userInfo?.lastName}`);
    else error && navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, error]);
  return (
    <>
      <BackPage turnSwitchTab={switchTab + 1}>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">
            {!loading ? fullName : "Đang chờ..."}
          </h4>
          <p className="text-[13px] font-normal text-text4">
            {!loading ? (
              userInfo?.postCount + " posts"
            ) : (
              <Skeleton
                variant="text"
                sx={{ fontSize: "13px", width: "60px" }}
              ></Skeleton>
            )}
          </p>
        </div>
      </BackPage>
      {!currentUser || loading || !fullName ? (
        <ProfileLoading />
      ) : (
        <>
          <div className="relative">
            <PictureCover
              src={userInfo?.coverImg}
              onClick={() => handleShowBackdrop(userInfo?.coverImg)}
            />
            <PictureAvatarBig
              avatar={userInfo?.avatar}
              alt={fullName}
              className="absolute bottom-0 p-1 left-5 translate-y-2/4"
              onClick={() => handleShowBackdrop(userInfo?.avatar)}
            />
          </div>
          <div className="px-5">
            <ProfileFeature
              yourSelf={yourSelf}
              isSender={userInfo?.isSender}
              status={userInfo?.status}
              chatID={userInfo?.chatID}
            ></ProfileFeature>
            <div className="flex flex-col mt-6">
              <TextHeading>{fullName}</TextHeading>
              <TextLight>{userInfo?.email}</TextLight>
              <ProfileGeneral
                dateJoin={userInfo?.createdAt}
                friendCount={userInfo?.listUserFriend.length}
                desc={userInfo?.detailInfo?.desc}
                birthday={userInfo?.detailInfo?.birthday}
                workAt={userInfo?.detailInfo?.workAt}
              ></ProfileGeneral>
            </div>
          </div>
          <ProfileTabList listTab={listTab}>
            <ProfileTabItem
              tabName={tabName}
              yourSelf={yourSelf}
              listUserFriend={userInfo?.listUserFriend}
            ></ProfileTabItem>
          </ProfileTabList>
        </>
      )}
      <PictureDialog {...others}></PictureDialog>
    </>
  );
};

const ProfileTabItem = ({ tabName, yourSelf, listUserFriend = [] }) => {
  switch (tabName) {
    case "posts":
      return <ProfilePost yourSelf={yourSelf}></ProfilePost>;

    case "friends":
      return <ProfileFriend listUserFriend={listUserFriend}></ProfileFriend>;

    case "likes":
      return <ProfileLike></ProfileLike>;

    default:
      return <ProfilePicture></ProfilePicture>;
  }
};

export default PersonalPage;
