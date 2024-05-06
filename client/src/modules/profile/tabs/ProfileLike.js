import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostList } from "redux/posts/postRequest";
import EmptyLayout from "layout/EmptyLayout";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";

const ProfileLike = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth.login);
  useEffect(() => {
    dispatch(getPostList(`/${id}?by=liked`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let { loading, listPost } = useSelector((state) => state.posts.getPost);
  if (currentUser?._id !== id) {
    listPost = listPost.map((post) => ({
      ...post,
      isLiked: post.listHeart.includes(currentUser?._id),
    }));
  }
  return (
    <div className="flex flex-col p-4 gap-y-5">
      {loading ? (
        <PostSkeleton></PostSkeleton>
      ) : listPost.length > 0 ? (
        listPost.map((post) => (
          <PostItem key={post._id} postInfo={post}></PostItem>
        ))
      ) : (
        <EmptyLayout
          linkImg="/img/profile-empty.png"
          info="Người dùng này chưa thích bất kỳ bài viết nào"
          support="Vui lòng chuyển sang trang khác."
        ></EmptyLayout>
      )}
    </div>
  );
};

export default ProfileLike;
