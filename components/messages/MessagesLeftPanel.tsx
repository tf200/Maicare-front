"use client";

import React, { FunctionComponent, useEffect, useMemo } from "react";
import { UserProfile } from "@/types/UserProfile";
import { getTime } from "@/utils/message-time";
import ProfilePicture from "@/components/ProfilePicture";
import EmployeesSearch from "@/components/searchDropdown/EmployeesSearch";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { useRouter } from "next/navigation";



export type ConversationItem = {
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
    enabled: !!employeeId,
  });
}

const MessagesLeftPanel: FunctionComponent = (props) => {
  const { data: user } = useMyInfo();
  const [currentPath, setCurrentPath] = React.useState<string | null>(window.location.pathname);
  const { data: conversations, refetch } = useConversations(user?.user);
  const [currentConversationEmployee, setCurrentConversationEmployee] = React.useState<UserProfile | UserProfile & { user: number } | any>(null);
  

  useEffect(() => {

    if(window.location.pathname !== currentPath){
      refetch();
      setCurrentPath(window.location.pathname);
    }
  }, [window.location.pathname]);

  return (
    <div className="hidden h-full flex-col xl:flex xl:w-1/4">
      <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
        <h3 className="text-lg font-medium text-slate-800  dark:text-white 2xl:text-xl">
          Active Conversations
          {conversations && (
            <span className="rounded-md border-[.5px] border-stroke bg-gray-2 py-0.5 px-2 text-base font-medium text-slate-800  dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
              {conversations.results.length}
            </span>
          )}
        </h3>
      </div>
      <div className="flex max-h-full flex-col overflow-auto p-5">
        <form className="sticky mb-7">
          <EmployeesSearch setNewConversationEmployee={setCurrentConversationEmployee} conversations={conversations?.results}/>
        </form>
        <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">

          {conversations?.results.map((conversation, item) => {
            return <ConversationItem key={conversation.id} conversation={conversation} setNewConversationEmployee={setCurrentConversationEmployee} isTheCurrentConversation={((conversation.involved_details[0]?.id === currentConversationEmployee?.user) || (conversation.involved_details[0]?.id === currentConversationEmployee?.id) || (conversation.involved_details[1]?.id === currentConversationEmployee?.user) || (conversation.involved_details[1]?.id === currentConversationEmployee?.id))}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MessagesLeftPanel;

type ConversationItemProps = {
  conversation: ConversationItem;
  isTheCurrentConversation?: boolean;
  setNewConversationEmployee: (employee: UserProfile) => void;
};

const ConversationItem: FunctionComponent<ConversationItemProps> = ({ conversation, isTheCurrentConversation, setNewConversationEmployee }) => {
  const { data: user } = useMyInfo();
  const participant = useMemo(
    () => conversation.involved_details?.find((profile) => profile.id !== user?.user),
    [user, conversation]
  );

  const conversationId = conversation.id;
  const isOnline = true;
  const lastSeen = "2021-10-10T10:10:10";
  const lastSentMessage = "";

  const router = useRouter();

  const handleClick = () => { 
    setNewConversationEmployee(participant);
    router.push(`/conversations/${conversationId}`);
  }

  return <>
  { participant && 
    <button
      onClick={handleClick}
      className={ "w-full flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark" + (isTheCurrentConversation ? " bg-gray-100 dark:bg-strokedark border-l-[3px] border-primary" : "")} 
      >
      <div className="relative mr-3.5 h-11 max-w-11 rounded-full">
        <ProfilePicture
          profilePicture={participant.profile_picture}
          className="h-full w-full object-cover object-center"
          width={44}
          height={44}
        />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
      </div>
      <div className="">
        <h5 className="text-sm font-medium text-slate-800  dark:text-white">
          {participant.first_name} {participant.last_name}
        </h5>
        {lastSeen && !isOnline && <p className="text-sm">{`Last seen ${getTime(lastSeen)}`}</p>}
        {lastSentMessage && <p className="text-sm">{lastSentMessage}</p>}
      </div>
    </button>
  }
  </>
};
