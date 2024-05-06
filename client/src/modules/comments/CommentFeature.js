import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import Overlay from "components/common/Overlay";
import ModalHeading from "components/modal/ModalHeading";
import PostMeta from "modules/posts/parts/PostMeta";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import ModalLine from "components/modal/ModalLine";
import CommentItem from "./CommentItem";
import { socket } from "api/config";
import { getCommentList } from "redux/comments/commentRequest";
import { deleteComment, newComment } from "redux/comments/commentSlice";
import CommentSkeleton from "components/skeleton/CommentSkeleton";
import LoadingType from "components/loading/LoadingType";
import { Link } from "react-router-dom";
import EmptyLayout from "layout/EmptyLayout";

const CommentFeature = ({ handleHideModal, post }) => {
  const { _id, authorID } = post;
  const { currentUser } = useSelector((state) => state.auth.login);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const emitTyping = useCallback(() => {
    socket.emit("typing");
  }, []);
  const emitStopTyping = useCallback(() => {
    socket.emit("stopTyping");
  }, []);
  useEffect(() => {
    dispatch(getCommentList(_id));
    socket.connect();
    socket.emit("join", { user: currentUser._id, post: _id });

    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stopTyping", () => {
      setIsTyping(false);
    });

    socket.on("comment", (comment) => {
      dispatch(newComment(comment));
      const el = document.querySelector(".commentList");
      el.scrollTop = el.scrollHeight;
    });

    socket.on("deletedComment", (commentId) => {
      dispatch(deleteComment(commentId));
    });
    return () => {
      socket.emit("remove-event-comment");
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  useEffect(() => {
    return () => emitStopTyping();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { listComment, loading } = useSelector(
    (state) => state.comments.getComment
  );

  return (
    <Overlay handleHideModal={handleHideModal}>
      <div className="w-[600px] mx-auto bg-white dark:bg-darkSoft z-50 rounded-xl show-modal ">
        <ModalHeading handleHideModal={handleHideModal}>
          Đăng bình luận
        </ModalHeading>
        <ModalLine />
        <div className="flex flex-col px-5 py-4 max-h-[80vh] overflow-auto">
          <PostMeta
            timer="22 phút trước"
            sizeAvatar={52}
            author={authorID}
          ></PostMeta>
          <div className="px-[26px] my-2 flex items-center">
            <div className="h-[45px] w-[2px] bg-[#ddd]"></div>
            <p className="ml-5 text-sm text-text3 dark:text-text4">
              Trả lời <b className="text-thirdColor">{authorID.lastName}</b>
            </p>
          </div>
          <div className="flex items-start gap-x-3">
            <Link to={"/profile/" + currentUser._id}>
              <Avatar
                alt={currentUser.firstName + " " + currentUser.lastName}
                src={currentUser.avatar}
                sx={{ width: 52, height: 52 }}
              />
            </Link>
            <CommentForm
              postID={_id}
              isTyping={isTyping}
              emitTyping={emitTyping}
              emitStopTyping={emitStopTyping}
            ></CommentForm>
          </div>
          <CommentList>
            {loading && (
              <>
                <CommentSkeleton></CommentSkeleton>
                <CommentSkeleton></CommentSkeleton>
              </>
            )}
            {!loading && listComment?.length > 0 ? (
              listComment.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  isAuthor={authorID._id === comment?.userID._id}
                />
              ))
            ) : (
              <EmptyLayout
                linkImg="/img/no-comment.png"
                info="Chưa có bình luận nào"
                support="Hãy trở thành người đầu tiên bình luận bài đăng này"
                className="py-3"
              ></EmptyLayout>
            )}
            {isTyping ? (
              <LoadingType message="Ai đó đang gõ một bình luận" />
            ) : null}
          </CommentList>
        </div>
      </div>
    </Overlay>
  );
};

export default CommentFeature;
