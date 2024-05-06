import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackPage from "components/common/BackPage";
import ChatItem from "modules/chats/ChatItem";
import { chatUserList } from "redux/chats/chatRequest";
import { socket } from "api/config";
import ChatSkeleton from "components/skeleton/ChatSkeleton";
import EmptyLayout from "layout/EmptyLayout";
import { newChatList } from "redux/chats/chatSlice";
import ButtonGradient from "components/button/ButtonGradient";
import { useNavigate } from "react-router-dom";
import ChatItemActive from "modules/chats/ChatItemActive";

const ChatPage = () => {
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listUserActive, listChats, loading } = useSelector(
    (state) => state.chats.chatInfo
  );

  useEffect(() => {
    document.title = "Nhắn Tin | FreshConnect";
    socket.connect();
    dispatch(chatUserList());

    socket.on("receive-info", ({ userID, listChat }) => {
      if (userID === currentUser?._id) {
        // eslint-disable-next-line array-callback-return
        const listChatNew = listChat.map((user) => {
          if (user.show)
            return {
              ...user,
              participant: user.participant.filter((i) => i._id !== userID)[0],
            };
        });
        dispatch(newChatList(listChatNew));
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listFriendActive = listChats.filter((chat) => {
    return (
      listUserActive &&
      listUserActive.length > 0 &&
      listUserActive.some((user) => user._id === chat.participant._id)
    );
  });

  return (
    <>
      <BackPage haveBackBtn={false}>
        <div className="flex flex-col px-2">
          <h4 className="text-lg font-bold">Nhắn Tin</h4>
          <p className="text-[13px] font-normal text-text4">
            {listChats?.length} bạn
          </p>
        </div>
      </BackPage>
      <div className="p-3">
        {listFriendActive && listFriendActive?.length > 0 && (
          <div className="grid grid-cols-5 mb-3 gap-x-2">
            {listFriendActive.map((chat) => (
              <ChatItemActive
                key={chat._id}
                userInfo={chat.participant}
                chatId={chat._id}
              ></ChatItemActive>
            ))}
          </div>
        )}
        <div className="flex flex-col">
          {!loading ? (
            listChats?.length > 0 ? (
              listChats.map((chat) => (
                <ChatItem
                  key={chat._id}
                  id={chat._id}
                  avatar={chat.participant.avatar}
                  createdAt={chat.latestMessage?.createdAt}
                  isActive={listUserActive?.some(
                    (user) => user._id === chat.participant._id
                  )}
                  username={
                    chat.participant.firstName + " " + chat.participant.lastName
                  }
                  latestMessage={
                    chat.latestMessage?.content
                      ? chat.latestMessage.sender === currentUser?._id
                        ? "You: " + chat.latestMessage.content
                        : chat.latestMessage.content
                      : "✌️ Hãy gửi tin nhắn để làm quen bạn mới nhé"
                  }
                ></ChatItem>
              ))
            ) : (
              <EmptyLayout
                linkImg="/img/remove-user.png"
                info="Không tìm thấy người dùng nào trong danh sách này"
                support="Hãy thêm bạn bè để trò chuyện"
                className="h-[300px] gap-y-6"
              >
                <div>
                  <ButtonGradient
                    onClick={() => navigate("/friends")}
                    theme={1}
                    className="w-[200px] py-5 mt-4 rounded-lg text-base font-bold"
                  >
                    Đến trang bạn bè
                  </ButtonGradient>
                </div>
              </EmptyLayout>
            )
          ) : (
            <>
              <ChatSkeleton></ChatSkeleton>
              <ChatSkeleton></ChatSkeleton>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
