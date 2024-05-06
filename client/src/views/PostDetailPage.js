import BackPage from "components/common/BackPage";
import PostSkeleton from "components/skeleton/PostSkeleton";
import EmptyLayout from "layout/EmptyLayout";
import PostItem from "modules/posts/PostItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostList } from "redux/posts/postRequest";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostList("/" + id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const { loading, listPost, error } = useSelector(
    (state) => state.posts.getPost
  );

  return (
    <>
      <BackPage turnSwitchTab={-1}>
        <h4 className="py-2 text-xl font-bold">Post detail</h4>
      </BackPage>
      <div className="px-5 py-4">
        {!loading ? (
          <>
            {listPost.map((post) => (
              <PostItem key={post._id} postInfo={post}></PostItem>
            ))}
            {(error || listPost.length === 0) && (
              <EmptyLayout
                linkImg="/img/profile-empty.png"
                info="Bài đăng này không tồn tại hoặc đã bị xóa"
                support="Vui lòng chuyển sang trang khác."
              ></EmptyLayout>
            )}
          </>
        ) : (
          <PostSkeleton />
        )}
      </div>
    </>
  );
};

export default PostDetail;
