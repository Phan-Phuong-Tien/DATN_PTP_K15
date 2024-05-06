import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostFeature from "modules/posts/PostFeature";
import PostItem from "modules/posts/PostItem";
import PostSkeleton from "components/skeleton/PostSkeleton";
import { getPostList } from "redux/posts/postRequest";
import EmptyLayout from "layout/EmptyLayout";

const ProfilePost = ({ yourSelf }) => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostList("/" + id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { loading, listPost } = useSelector((state) => state.posts.getPost);
  return (
    <div className="flex flex-col p-4 gap-y-3">
      {yourSelf && (
        <PostFeature
          linkInfo={"/profile/" + currentUser?._id}
          avatar={currentUser?.avatar}
          username={currentUser?.lastName}
        ></PostFeature>
      )}
      {loading ? (
        <>
          <PostSkeleton></PostSkeleton>
          <PostSkeleton></PostSkeleton>
        </>
      ) : listPost?.length > 0 ? (
        listPost.map((post) => (
          <PostItem key={post._id} postInfo={post}></PostItem>
        ))
      ) : (
        <EmptyLayout
          linkImg="/img/profile-empty.png"
          info="Người dùng này chưa thích hoặc chưa đăng"
          support="Vui lòng chuyển sang trang khác."
        ></EmptyLayout>
      )}
    </div>
  );
};

export default ProfilePost;
