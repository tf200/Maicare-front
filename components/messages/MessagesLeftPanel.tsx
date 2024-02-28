"use client";

import React, { FunctionComponent } from "react";
import { UserProfile } from "@/types/UserProfile";
import { getTime } from "@/utils/message-time";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import ProfilePicture from "@/components/ProfilePicture";
import MagnifierIcon from "@/components/icons/MagnifierIcon";
import SearchDropdown from "@/components/searchDropdown/SearchDropdown";
import EmployeesSearch from "@/components/searchDropdown/EmployeesSearch";

const MessagesLeftPanel: FunctionComponent = (props) => {
  const { data: chatProfiles } = useEmployeesList();
  return (
    <div className="hidden h-full flex-col xl:flex xl:w-1/4">
      <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
        <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
          Active Conversations
          <span className="rounded-md border-[.5px] border-stroke bg-gray-2 py-0.5 px-2 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
            7
          </span>
        </h3>
      </div>
      <div className="flex max-h-full flex-col overflow-auto p-5">
        <form className="sticky mb-7">
          <EmployeesSearch />
        </form>
        <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
          {chatProfiles?.results.map((employee, item) => {
            return <ChatProfile profile={employee} isOnline={true} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MessagesLeftPanel;

type ChatProfileProps = {
  profile: UserProfile;
  isOnline: boolean;
  lastSeen?: string;
  lastSentMessage?: string;
};

const ChatProfile: FunctionComponent<ChatProfileProps> = ({
  profile,
  isOnline,
  lastSeen,
  lastSentMessage,
}) => {
  return (
    <div className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark">
      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
        <ProfilePicture
          profilePicture={profile.profile_picture}
          className="h-full w-full object-cover object-center"
          width={44}
          height={44}
        />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
      </div>
      <div className="w-full">
        <h5 className="text-sm font-medium text-black dark:text-white">
          {profile.first_name} {profile.last_name}
        </h5>
        {lastSeen && !isOnline && (
          <p className="text-sm">{`Last seen ${getTime(lastSeen)}`}</p>
        )}
        {lastSentMessage && <p className="text-sm">{lastSentMessage}</p>}
      </div>
    </div>
  );
};
