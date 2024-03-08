"use client";

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ProfilePicture from "@/components/ProfilePicture";
import { useMyInfo, useUserInfo } from "@/utils/user-info/getUserInfo";
import { cn } from "@/utils/cn";
import { getTime } from "@/utils/message-time";
import { useWSContext } from "@/hooks/useWSContext";
import MessageEditor from "@/components/FormFields/MessageEditor";
import api from "@/utils/api";
import { useQuery, useQueryClient } from "react-query";
import SendMessage from "@/components/SendMessage";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type ChatBoxProps =
  | {
      conversationId: number;
    }
  | {
      recipientId: number;
    };

type ConversationResDto = Paginated<MessageItem> & {
  involved: { id: number; name: string }[];
};
async function getConversation(conversationId: number) {
  const response = await api.get<ConversationResDto>(
    `/chat/messages/${conversationId}/`
  );
  return response.data;
}

const useConversation = (conversationId?: number) => {
  return useQuery(
    ["conversation-details", conversationId],
    () => getConversation(conversationId),
    {
      enabled: !!conversationId,
    }
  );
};

const ChatBox: FunctionComponent<ChatBoxProps> = (props) => {
  const conversationId = "conversationId" in props && props.conversationId;
  const recipientId = "recipientId" in props && props.recipientId;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { ws, isConnected } = useWSContext();
  const { data: myInfo } = useMyInfo();
  const { data: conversation } = useConversation(conversationId);

  const otherParticipant = useMemo(
    () =>
      conversation?.involved?.find((profile) => profile.id !== myInfo?.user),
    [myInfo, conversation]
  );
  const { data: recipientInfo } = useUserInfo(
    recipientId || otherParticipant?.id
  );
  const recipientFullName = useMemo(() => {
    if (!recipientInfo) {
      return "";
    }
    return recipientInfo?.first_name + " " + recipientInfo?.last_name;
  }, [recipientInfo]);

  const messagesContainer = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(
    (message: string) => {
      const newMessage = {
        type: "message",
        message,
        recipient_id: recipientInfo.user,
        message_id: uuidv4(),
      };
      let unsubscribe: () => void;
      if (recipientId) {
        unsubscribe = ws?.onMessageDelivery((data) => {
          router.push("/conversations/" + data.conversation);
          unsubscribe();
        });
      } else if (conversationId) {
        unsubscribe = ws?.onMessageDelivery((data) => {
          queryClient.invalidateQueries([
            "conversation-details",
            conversationId,
          ]);
        });
      }
      ws?.send(newMessage);
      return () => {
        unsubscribe?.();
      };
    },
    [
      isConnected,
      ws,
      recipientInfo,
      recipientId,
      myInfo,
      router,
      queryClient,
      conversationId,
    ]
  );

  useEffect(() => {
    if (conversationId && ws) {
      const unsubscribe = ws.onSentMessage((data) => {
        queryClient.invalidateQueries(["conversation-details", conversationId]);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [ws, conversationId]);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
    }
  }, [conversation]);
  return (
    <>
      {/* <!-- ====== Chat Box Start --> */}
      <div
        ref={messagesContainer}
        className="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark"
      >
        {recipientInfo && (
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
                {recipientFullName}
              </h5>
              <p className="text-sm">Reply to message</p>
            </div>
          </div>
        )}
      </div>
      {conversation?.results.length === 0 ||
        (recipientId && !conversationId && (
          <SendMessage
            firstLine={"Start a conversation with " + recipientFullName}
            secondLine={
              "Send your first message to start a conversation with " +
              recipientFullName
            }
          />
        ))}
      <div
        ref={messagesContainer}
        className="flex flex-1 flex-col-reverse no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5"
      >
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
  id: string;
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
  const { data: userInfo } = useMyInfo();
  const isCurrentUser = useMemo(
    () => message.sender === userInfo.user,
    [message, userInfo]
  );

  const { data: senderInfo } = useUserInfo(message.sender);
  const recipientFullName = useMemo(() => {
    if (!senderInfo) {
      return "";
    }
    return senderInfo?.first_name + " " + senderInfo?.last_name;
  }, [senderInfo]);
  return (
    <div className={cn("max-w-125", { "ml-auto": isCurrentUser })}>
      <p className="mb-2.5 text-sm font-medium">{recipientFullName}</p>
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
