import React, { useEffect } from "react";
import useFetchMore from "hooks/useFetchMore";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";
import PostList from "modules/posts/PostList";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Trang Chủ | FreshConnect";
    dispatch(getPostList());
  }, [dispatch]);

  const { listPost, loading: getPostLoading } = useSelector(
    (state) => state.posts.getPost
  );

  // Sắp xếp các bài viết từ mới đến cũ
  const sortedPosts = listPost?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const { hasMore, countItem, fetchMoreData } = useFetchMore(sortedPosts?.length);

  return (
    <div className="px-4 py-3">
      <PostFeature
        username={currentUser?.lastName}
        avatar={currentUser?.avatar}
        linkInfo={"/profile/" + currentUser?._id}
      />
      <PostList dataLength={countItem} next={fetchMoreData} hasMore={hasMore}>
        {sortedPosts?.length > 0 && !getPostLoading ? (
          sortedPosts.map((post, i) =>
            i < countItem ? (
              <PostItem key={post._id} postInfo={post} />
            ) : null
          )
        ) : (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}
      </PostList>
    </div>
  );
};

export default HomePage;
