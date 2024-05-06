import React from "react";
import PostSkeleton from "components/skeleton/PostSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const PostList = ({ children, ...props }) => {
  return (
    <InfiniteScroll
      className="flex flex-col mt-4 gap-y-3"
      loader={<PostSkeleton />}
      scrollableTarget="scrollableDiv"
      {...props}
    >
      {children}
    </InfiniteScroll>
  );
};

export default PostList;
