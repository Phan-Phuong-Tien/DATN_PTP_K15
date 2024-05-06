import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFriend } from "redux/users/userRequest";
import { Avatar, Box, CircularProgress } from "@mui/material";
import TextHeading from "components/text/TextHeading";
import TextUsername from "components/text/TextUsername";
import { Link } from "react-router-dom";
import TextLight from "components/text/TextLight";

const SideContact = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userFriend({ status: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { listUsers, loading } = useSelector((state) => state.users?.friend);
  return (
    <div className="mt-5 overflow-hidden rounded-xl bg-whiteSoft dark:bg-darkSoft">
      <TextHeading className="p-4">Liên hệ</TextHeading>
      <div className="flex flex-col">
        {!loading ? (
          listUsers?.length > 0 ? (
            listUsers.map((user) => (
              <Link
                key={user?._id}
                to={"/profile/" + user?._id}
                className="flex items-center justify-between px-4 py-3 transition-all cursor-pointer hover:bg-graySoft hover:dark:bg-gray-700"
              >
                <div className="flex items-center gap-x-3">
                  <Avatar
                    alt=""
                    src={user?.avatar}
                    sx={{ width: 40, height: 40 }}
                  />
                  <TextUsername>
                    {user?.firstName + " " + user?.lastName}
                  </TextUsername>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-4 gap-y-3">
              <img
                src="/img/remove-user.png"
                className="w-[50px] h-[50px]"
                alt=""
              />
              <div className="text-center">
                <TextLight>Không có bạn bè. Hãy tìm bạn!</TextLight>
              </div>
            </div>
          )
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "40px 0" }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
};

export default SideContact;
