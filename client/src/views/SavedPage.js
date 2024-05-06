import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import BackPage from "components/common/BackPage";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";
import useFetchMore from "hooks/useFetchMore";
import PostList from "modules/posts/PostList";
import EmptyLayout from "layout/EmptyLayout";

const SavedPage = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Đã Lưu | FreshConnect";
    currentUser && dispatch(getPostList(`/${currentUser._id}?by=saved`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { listPost, loading } = useSelector((state) => state.posts.getPost);
  const { hasMore, countItem, fetchMoreData } = useFetchMore(listPost?.length);

  return (
    <>
      <BackPage haveBackBtn={false}>
        <div className="flex flex-col px-2">
          <h4 className="text-lg font-bold">Bài viết đã lưu</h4>
          {/* <p className="text-[13px] font-normal text-text4">12 posts</p> */}
          <p className="text-[13px] font-normal text-text4">  </p>
        </div>
      </BackPage>
      <div className="px-4 my-3">
        {!loading && listPost?.length === 0 ? (
          <EmptyLayout
            linkImg="/img/profile-empty.png"
            info="Bạn chưa lưu bài viết nào"
            support="Hãy lưu lại để xem lại"
            className="h-[250px] gap-y-6"
          ></EmptyLayout>
        ) : !loading ? (
          <PostList
            dataLength={countItem}
            next={fetchMoreData}
            hasMore={hasMore}
          >
            {listPost.map(
              (post, i) =>
                i < countItem && (
                  <PostItem key={post._id} postInfo={post}></PostItem>
                )
            )}
          </PostList>
        ) : (
          <PostSkeleton></PostSkeleton>
        )}
      </div>
    </>
  );
};

export default SavedPage;
