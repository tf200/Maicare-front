"use client";

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import ProfilePicture from "@/components/ProfilePicture";
import { useUserInfo } from "@/utils/user-info/getUserInfo";
import { cn } from "@/utils/cn";
import { getTime } from "@/utils/message-time";
import { UserProfile } from "@/types/UserProfile";
import { useWSContext } from "@/hooks/useWSContext";
import MessageEditor from "@/components/FormFields/MessageEditor";

const MOCK_USER_1: UserProfile = {
  id: 1,
  profile_picture: "https://randomuser.me/api/portraits",
  first_name: "Taha",
  last_name: "Api",
};

const MOCK_USER_2: UserProfile = {
  id: 2,
  profile_picture: "",
  first_name: "Andri",
  last_name: "Thomas",
};

const MOCK_MESSAGES: MessageItem[] = [
  {
    id: 1,
    content: "Hello, Thomas! I will check the schedule and inform you",
    date_time: "2024-02-26T13:55:00",
    sender: MOCK_USER_2,
  },
  {
    id: 2,
    content: "This is a reply from Taha.",
    date_time: "2024-02-26T14:10:00",
    sender: MOCK_USER_1,
  },
  {
    id: 3,
    content: "I confirmed the schedule you requested",
    date_time: "2024-02-27T09:15:00",
    sender: MOCK_USER_2,
  },
  {
    id: 4,
    content: "That's great. Thanks, Taha.",
    date_time: "2024-02-27T09:45:00",
    sender: MOCK_USER_1,
  },
  {
    id: 5,
    content: "Your appointment is set for tomorrow from 2:00 to 5:00pm",
    date_time: "2024-02-27T18:20:00",
    sender: MOCK_USER_2,
  },
  {
    id: 6,
    content: "Perfect! Thanks for your help.",
    date_time: "2024-02-27T18:50:00",
    sender: MOCK_USER_1,
  },
  {
    id: 7,
    content: "Just reminding, you have an appointment tomorrow",
    date_time: "2024-02-28T09:07:00",
    sender: MOCK_USER_2,
  },
  {
    id: 8,
    content: "Thank you for the reminder, Andri.",
    date_time: "2024-02-28T10:00:00",
    sender: MOCK_USER_1,
  },
];

type Conversation = {
  id: number;
  employee_1: UserProfile;
  employee_2: UserProfile;
  messages: MessageItem[];
};

const MOCK_CONVERSATION: Conversation = {
  id: 1,
  employee_1: MOCK_USER_1,
  employee_2: MOCK_USER_2,
  messages: MOCK_MESSAGES,
};

const ChatBox: FunctionComponent = (props) => {
  const { data: userInfo } = useUserInfo();
  const { ws, isConnected } = useWSContext();
  const isEitherUser = useMemo(() => {
    return 1 === MOCK_USER_1.id || 1 === MOCK_USER_2.id;
  }, [MOCK_CONVERSATION]);

  const secondUser = useMemo(() => {
    if (!isEitherUser) {
      throw new Error("User not found");
    }
    if (1 === MOCK_USER_1.id) {
      return MOCK_USER_2;
    } else {
      return MOCK_USER_1;
    }
  }, [MOCK_CONVERSATION, isEitherUser]);

  const sendMessage = useCallback(
    (message: string) => {
      ws?.send({
        type: "message",
        message,
        recipient_id: secondUser.id,
        conversation_id: MOCK_CONVERSATION.id,
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
              profilePicture={secondUser.profile_picture}
              width={52}
              height={52}
            />
          </div>
          <div>
            <h5 className="font-medium text-black dark:text-white">
              {secondUser.first_name} {secondUser.last_name}
            </h5>
            <p className="text-sm">Reply to message</p>
          </div>
        </div>
      </div>
      <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
        {MOCK_MESSAGES.map((message) => (
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
  date_time: string;
  sender: UserProfile;
};

type MessageProps = {
  message: MessageItem;
};

const Message: FunctionComponent<MessageProps> = ({ message }) => {
  const { data: userInfo } = useUserInfo();
  const isCurrentUser = useMemo(
    // TODO: Replace with actual user id
    () => message.sender.id === 1,
    [message, userInfo]
  );
  return (
    <div className={cn("max-w-125", { "ml-auto": isCurrentUser })}>
      <p className="mb-2.5 text-sm font-medium">
        {message.sender.first_name} {message.sender.last_name}
      </p>
      <div
        className={cn("mb-2.5 rounded-2xl py-3 px-5", {
          "rounded-tl-none bg-gray dark:bg-boxdark-2": !isCurrentUser,
          "rounded-br-none bg-primary text-white": isCurrentUser,
        })}
      >
        <p>{message.content}</p>
      </div>
      <p className="text-xs">{getTime(message.date_time)}</p>
    </div>
  );
};
