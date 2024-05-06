import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { socket } from "api/config";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  content: yup.string().required(),
});

const MessageForm = ({
  yourID,
  reply = null,
  onCloseReply = () => {},
  userID = "",
}) => {
  const {
    register,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const handleChatMessage = (values) => {
    onCloseReply();
    socket.emit("send-message", {
      ...values,
      chatID: id,
      sender: yourID,
      reply,
    });
    socket.emit("rerender-chat", userID);
    socket.emit("send-notify-message", userID);
    const audio = new Audio("/audio/message-124468.mp3");
    audio.play();
    reset({
      content: "",
    });
  };
  const handleTypingChat = (e) => {
    if (e.key !== "Backspace" && e.key !== "Alt" && e.key !== "Tab")
      socket.emit("typing-message", id);
  };
  return (
    <form
      className={`flex items-center gap-x-2`}
      onSubmit={handleSubmit(handleChatMessage)}
      autoComplete="off"
    >
      <input
        type="text"
        placeholder="Nhập tin nhắn vào đây"
        autoFocus={true}
        name="content"
        className="w-full px-4 py-3 text-sm transition-all border border-none rounded-3xl text-text2 dark:text-white dark:bg-darkSoft bg-whiteSoft focus:bg-graySoft focus:dark:bg-gray-700"
        onKeyDown={handleTypingChat}
        {...register("content")}
      />
      <button
        className={`flex items-center justify-center p-2 transition-all bg-transparent rounded-full cursor-pointer hover:bg-graySoft hover:dark:bg-gray-700 ${
          !isDirty && "pointer-events-none"
        }`}
      >
        <SendIcon className="text-2xl text-primary" />
      </button>
    </form>
  );
};

export default MessageForm;
