import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BackPage from "components/common/BackPage";
import TextHeading from "components/text/TextHeading";
import useTurnSwitch from "hooks/useTurnSwitch";
import FriendItem from "modules/friends/FriendItem";
import PostItem from "modules/posts/PostItem";
import EmptyLayout from "layout/EmptyLayout";
import { userFriend } from "redux/users/userRequest";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import FriendSkeleton from "components/skeleton/FriendSkeleton";
import PostSkeleton from "components/skeleton/PostSkeleton";

const FilterPage = () => {
  const { switchTab, keyName } = useTurnSwitch("q");
  const [searchParams, setSearchParams] = useSearchParams("");
  const { listPost, loading: loadPost } = useSelector(
    (state) => state.posts.getPost
  );
  const { listUsers, loading: loadUser } = useSelector(
    (state) => state.users.friend
  );
  const dispatch = useDispatch();
  const listQuery = searchParams.get("list") || "all";
  const sortBy = searchParams.get("by") || "latest";

  const empty = (
    <EmptyLayout
      className="py-10"
      linkImg="/img/searching.png"
      info="No results found for this keyword"
      support="Please try again later!"
    ></EmptyLayout>
  );

  const users =
    (listQuery === "people" || listQuery === "all") && listUsers.length > 0
      ? listUsers.map((user) => (
          <FriendItem
            key={user?._id}
            userID={user?._id}
            src={user?.avatar}
            fullName={user?.firstName + " " + user?.lastName}
            email={user?.email}
            linkInfo={"/profile/" + user?._id}
            status={user?.status}
            isSender={user?.isSender}
          ></FriendItem>
        ))
      : listQuery === "people" && listUsers.length === 0
      ? empty
      : null;

  const posts =
    (listQuery === "post" || listQuery === "all") && listPost.length > 0
      ? listPost.map((post) => (
          <PostItem key={post?._id} postInfo={post}></PostItem>
        ))
      : listQuery === "post" && listPost.length === 0
      ? empty
      : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (listQuery === "post") {
      dispatch(getPostList(`?keyword=${keyName}&by=${sortBy}`));
    } else if (listQuery === "people") {
      dispatch(userFriend({ name: keyName }));
    } else {
      dispatch(userFriend({ name: keyName }));
      dispatch(getPostList(`?keyword=${keyName}`));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyName, listQuery, sortBy]);
  return (
    <>
      <BackPage turnSwitchTab={switchTab}>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">Search</h4>
          <p className="text-[13px] font-normal text-text4">
            Have {listPost.length + listUsers.length} result for "{keyName}"
          </p>
        </div>
      </BackPage>
      {listPost?.length === 0 && listUsers?.length === 0 ? (
        empty
      ) : (
        <div className="flex flex-col px-5 py-4">
          {listQuery !== "post" ? (
            <div className={loadUser || listUsers.length > 0 ? "mb-6" : ""}>
              {(loadUser || listUsers.length > 0) && (
                <TextHeading className="mb-3">People</TextHeading>
              )}
              <div
                className={`grid ${
                  loadUser || listUsers.length > 0 ? "grid-cols-2" : ""
                } gap-x-5 gap-y-4`}
              >
                {!loadUser ? users : <FriendSkeleton></FriendSkeleton>}
              </div>
            </div>
          ) : null}
          {listQuery !== "people" ? (
            <div>
              {(loadPost || listPost.length > 0) && (
                <TextHeading className="mb-3">Posts</TextHeading>
              )}
              <div className="flex flex-col mt-4 gap-y-3">
                {!loadPost ? posts : <PostSkeleton></PostSkeleton>}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default FilterPage;
