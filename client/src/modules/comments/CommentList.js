import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TextLight from "components/text/TextLight";
import useToggle from "hooks/useToggle";
import CommentSkeleton from "components/skeleton/CommentSkeleton";

const CommentList = ({ children }) => {
  const [showComment, setShowComment] = useToggle(false);
  return (
    <>
      <div className="flex flex-col items-center mt-2 gap-y-2 commentList">
        <TextLight>Ấn để {showComment ? "ẩn" : "hiện"} bình luận</TextLight>
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-graySoft bg-whiteSoft"
          onClick={setShowComment}
        >
          <ArrowDownwardIcon
            className={`text-[28px] text-text3 ${showComment && "rotate-180"}`}
          />
        </div>
      </div>
      {showComment && (
        <div className="flex flex-col my-5 gap-y-5 show-comment">
          {children}
        </div>
      )}
    </>
  );
};

export default CommentList;
