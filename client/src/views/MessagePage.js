import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageHistory } from "redux/chats/chatRequest";
import { addMessage, removeMessage } from "redux/chats/chatSlice";
import { useParams } from "react-router-dom";
import { socket } from "api/config";
import BackPage from "components/common/BackPage";
import MessageForm from "modules/messages/MessageForm";
import MessageProfile from "modules/messages/MessageProfile";
import MessageItem from "modules/messages/MessageItem";
import MessageSkeleton from "components/skeleton/MessageSkeleton";
import LoadingType from "components/loading/LoadingType";
import MessageReply from "modules/messages/MessageReply";

const MessagePage = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [typing, setTyping] = useState(false);
  const [reply, setReply] = useState(null);

  useEffect(() => {
    socket.connect();
    dispatch(messageHistory(id));

    socket.emit("join-chat", id);

    socket.on("receive-message", (data) => {
      dispatch(addMessage(data));
    });

    socket.on("receive-again", (data) => {
      dispatch(removeMessage(data));
    });

    socket.on("receive-typing", () => {
      setTyping(true);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { listMessage, loading, participant } = useSelector(
    (state) => state.chats.messageInfo
  );
  const { listUserActive } = useSelector((state) => state.chats.chatInfo);

  setTimeout(() => {
    if (typing) setTyping(false);
  }, 2000);

  document.title = `${participant?.firstName || "Waiting"} ${
    participant?.lastName || "..."
  } | FreshConnect`;

  useEffect(() => {
    listMessage?.length > 0 && document.body.scrollIntoView(false);
  }, [listMessage]);

  if (!participant) return;
  const checkActive = !!listUserActive?.filter(
    (user) => user._id === participant?._id
  )[0];

  return (
    <>
      <BackPage turnSwitchTab="/chats">
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">
            {!loading
              ? participant?.firstName + " " + participant?.lastName
              : "Đang chờ ..."}
          </h4>
          <p className="text-[13px] font-normal text-text4">
            {checkActive ? "Hoạt Động" : "Không Hoạt Động"}
          </p>
        </div>
      </BackPage>
      <div className="flex flex-col pt-3">
        <MessageProfile
          userInfo={participant}
          loading={loading}
        ></MessageProfile>
        <div className="flex flex-col w-full px-5 mt-4 mb-3 gap-y-3 min-h-[333px]">
          {!loading ? (
            listMessage?.length > 0 &&
            listMessage.map((mess) => (
              <MessageItem
                key={mess._id}
                yourself={mess.sender._id === currentUser?._id}
                messageID={mess._id}
                senderInfo={mess.sender}
                userID={{ yourID: currentUser?._id, userInfo: participant }}
                fullName={mess.sender.firstName + " " + mess.sender.lastName}
                replyInfo={mess.reply}
                handleReplyMessage={() =>
                  setReply({
                    id: mess._id,
                    content: mess.content,
                    userID: mess.sender._id,
                  })
                }
              >
                {mess.content}
              </MessageItem>
            ))
          ) : (
            <>
              <MessageSkeleton yourself />
              <MessageSkeleton yourself={false} />
              <MessageSkeleton yourself />
              <MessageSkeleton yourself={false} />
            </>
          )}
          {typing && (
            <MessageItem
              yourself={false}
              senderInfo={participant}
              fullName={participant.firstName + " " + participant.lastName}
            >
              <LoadingType className="h-[22px]"></LoadingType>
            </MessageItem>
          )}
        </div>
        <div className="sticky bottom-0 left-0 z-50 w-full px-5 py-4 bg-white shadow-sm dark:bg-gray-800 bg-opacity-95">
          {reply && (
            <MessageReply
              reply={reply}
              yourself={reply.userID === currentUser?._id}
              participant={participant}
              onCloseReply={() => setReply(null)}
            ></MessageReply>
          )}
          <MessageForm
            onCloseReply={() => setReply(null)}
            yourID={currentUser?._id}
            reply={reply}
            userID={participant?._id}
          ></MessageForm>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
