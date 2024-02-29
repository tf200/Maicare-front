"use client";

import React, { FunctionComponent, useCallback, useMemo } from "react";
import ProfilePicture from "@/components/ProfilePicture";
import { useUserInfo } from "@/utils/user-info/getUserInfo";
import { cn } from "@/utils/cn";
import { getTime } from "@/utils/message-time";
import { UserProfile } from "@/types/UserProfile";
import { useWSContext } from "@/hooks/useWSContext";
import MessageEditor from "@/components/FormFields/MessageEditor";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { useConversations } from "@/components/messages/MessagesLeftPanel";

type Conversation = {
  id: number;
  employee_1: UserProfile;
  employee_2: UserProfile;
  messages: MessageItem[];
};

type ChatBoxProps = {
  conversationId: number;
};

type ConversationResDto = Paginated<any>;
async function getConversation(conversationId: number) {
  const response = await api.get<ConversationResDto>(
    `/chat/messages/${conversationId}/`
  );
  return response.data;
}

const useConversation = (conversationId: number) => {
  return useQuery(["conversation-details", conversationId], () =>
    getConversation(conversationId)
  );
};

const ChatBox: FunctionComponent<ChatBoxProps> = ({ conversationId }) => {
  const { ws, isConnected } = useWSContext();
  const { data: userInfo } = useUserInfo();
  const { data: conversation } = useConversation(conversationId);
  const { data: conversationsList } = useConversations(userInfo.user);
  const conversationItem = useMemo(() => {
    if (!conversation) {
      return undefined;
    }
    return conversationsList?.results.find(
      (item) => item.id === conversationId
    );
  }, [conversationsList]);
  const otherParticipant = useMemo(
    () =>
      conversationItem?.involved_details?.find(
        (profile) => profile.id !== userInfo?.user
      ),
    [conversationItem, userInfo]
  );

  // TODO: use the recipientId to retrieve their information
  const { data: recipientInfo } = useUserInfo();

  const sendMessage = useCallback(
    (message: string) => {
      ws?.send({
        // type: "message",
        message,
        recipient_id: otherParticipant.id,
        conversation_id: userInfo.user,
      });
    },
    [isConnected, ws]
  );
  return (
    <>
      {/* <!-- ====== Chat Box Start --> */}
      <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
        <div className="flex items-center">
          <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
            <ProfilePicture
              profilePicture={recipientInfo.profile_picture}
              width={52}
              height={52}
            />
          </div>
          <div>
            <h5 className="font-medium text-black dark:text-white">
              {recipientInfo.first_name} {recipientInfo.last_name}
            </h5>
            <p className="text-sm">Reply to message</p>
          </div>
        </div>
      </div>
      <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
        {conversation?.results.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <div className="sticky bottom-0 border-t border-stroke bg-white py-5 px-6 dark:border-strokedark dark:bg-boxdark">
        <MessageEditor onSubmit={sendMessage} disabled={!isConnected} />
      </div>
    </>
  );
};

export default ChatBox;

type MessageItem = {
  id: number;
  content: string;
  timestamp: string;
  sender: number;
  read_status: boolean;
  conversation: number;
};

type MessageProps = {
  message: MessageItem;
};

const Message: FunctionComponent<MessageProps> = ({ message }) => {
  const { data: userInfo } = useUserInfo();
  const isCurrentUser = useMemo(
    () => message.sender === userInfo.user,
    [message, userInfo]
  );

  // TODO: USE THE SENDER ID TO RETRIEVE THEIR INFORMATION
  const { data: senderInfo } = useUserInfo();
  return (
    <div className={cn("max-w-125", { "ml-auto": isCurrentUser })}>
      <p className="mb-2.5 text-sm font-medium">
        {senderInfo?.first_name} {senderInfo?.last_name}
      </p>
      <div
        className={cn("mb-2.5 rounded-2xl py-3 px-5", {
          "rounded-tl-none bg-gray dark:bg-boxdark-2": !isCurrentUser,
          "rounded-br-none bg-primary text-white": isCurrentUser,
        })}
      >
        <p>{message.content}</p>
      </div>
      <p className="text-xs">{getTime(message.timestamp)}</p>
    </div>
  );
};
