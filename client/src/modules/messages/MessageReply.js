import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextLight from "components/text/TextLight";
import TextUsername from "components/text/TextUsername";

const MessageReply = ({
  reply,
  yourself = false,
  participant,
  onCloseReply = () => {},
}) => {
  return (
    <div className="flex items-start justify-between">
      <div className="mb-2">
        <TextUsername className="leading-[18px] dark:text-white text-text1">
          Đang trả lời{" "}
          <span className="font-bold text-primary">
            {yourself
              ? " chính bạn"
              : `${participant.firstName} ${participant.lastName}`}
          </span>
        </TextUsername>
        <TextLight>{reply.content}</TextLight>
      </div>
      <div
        onClick={onCloseReply}
        className="flex items-center justify-center transition-all rounded-full cursor-pointer w-7 h-7 bg-graySoft dark:bg-gray-700 hover:bg-opacity-90"
      >
        <CloseIcon className="text-base text-text2 dark:text-text4" />
      </div>
    </div>
  );
};

export default MessageReply;
