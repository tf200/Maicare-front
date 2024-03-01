"use client";

import React, { FunctionComponent, useMemo } from "react";
import { UserProfile } from "@/types/UserProfile";
import { getTime } from "@/utils/message-time";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import ProfilePicture from "@/components/ProfilePicture";
import EmployeesSearch from "@/components/searchDropdown/EmployeesSearch";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import Link from "next/link";

type ConversationItem = {
  id: number;
  involved_details: UserProfile[];
};

type ConversationsResDto = Paginated<ConversationItem>;

async function getConversations() {
  const response = await api.get<ConversationsResDto>("/chat/conversations/");
  return response.data;
}

export function useConversations(employeeId: number) {
  return useQuery(["conversations", employeeId], getConversations, {
    // enabled: !!employeeId,
  });
}

const MessagesLeftPanel: FunctionComponent = (props) => {
  const { data: chatProfiles } = useEmployeesList();
  const { data: user } = useMyInfo();
  const { data: conversations } = useConversations(user.user);
  console.log(conversations?.results, "conversations");
  return (
    <div className="hidden h-full flex-col xl:flex xl:w-1/4">
      <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
        <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
          Active Conversations
          {conversations && (
            <span className="rounded-md border-[.5px] border-stroke bg-gray-2 py-0.5 px-2 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
              {conversations.results.length}
            </span>
          )}
        </h3>
      </div>
      <div className="flex max-h-full flex-col overflow-auto p-5">
        <form className="sticky mb-7">
          <EmployeesSearch />
        </form>
        <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
          {conversations?.results.map((conversation, item) => {
            return (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessagesLeftPanel;

type ConversationItemProps = {
  conversation: ConversationItem;
};

const ConversationItem: FunctionComponent<ConversationItemProps> = ({
  conversation,
}) => {
  const { data: user } = useMyInfo();
  const otherParticipant = useMemo(
    () =>
      conversation.involved_details?.find(
        (profile) => profile.id !== user?.user
      ),
    [user, conversation]
  );
  return (
    <ChatProfile
      conversationId={conversation.id}
      participant={otherParticipant}
    />
  );
};

type Props = {
  participant: UserProfile;
  conversationId: number;
};

const ChatProfile: FunctionComponent<Props> = ({
  participant,
  conversationId,
}) => {
  const isOnline = true;
  const lastSeen = "2021-10-10T10:10:10";
  const lastSentMessage = "Hello, how are you?";
  return (
    <Link
      href={`/conversations/${conversationId}`}
      className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark"
    >
      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
        <ProfilePicture
          profilePicture={participant.profile_picture}
          className="h-full w-full object-cover object-center"
          width={44}
          height={44}
        />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
      </div>
      <div className="w-full">
        <h5 className="text-sm font-medium text-black dark:text-white">
          {participant.first_name} {participant.last_name}
        </h5>
        {lastSeen && !isOnline && (
          <p className="text-sm">{`Last seen ${getTime(lastSeen)}`}</p>
        )}
        {lastSentMessage && <p className="text-sm">{lastSentMessage}</p>}
      </div>
    </Link>
  );
};
