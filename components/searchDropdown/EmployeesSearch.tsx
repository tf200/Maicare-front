import React, { FunctionComponent } from "react";
import SearchDropdown from "@/components/searchDropdown/SearchDropdown";
import { useSearchEmployeeOptions } from "@/hooks/useSearchEmployeeOptions";
import { useRouter } from "next/navigation";
import { useMyInfo } from "@/utils/user-info/getUserInfo";
import { UserProfile } from "@/types/UserProfile";
import { ConversationItem } from "../messages/MessagesLeftPanel";

type EmployeesSearchProps = {
  setNewConversationEmployee: ( employee: UserProfile ) => void;
  conversations: ConversationItem[];
};

function EmployeesSearch ({ setNewConversationEmployee, conversations }: EmployeesSearchProps) {
  const { setSearchQuery, options, searchQuery } = useSearchEmployeeOptions();
  const { data: user } = useMyInfo();
  const router = useRouter();
  return (
    <SearchDropdown
      options={options?.filter((option) => option?.value?.id !== user?.id)}
      placeholder={"Zoeken..."}
      handleQueryChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      onSelectItem={(value) => {
        setNewConversationEmployee(value);
        const isInHistoryChat = conversations?.filter((conversation) => {if(conversation.involved_details[0]?.id === value.user || conversation.involved_details[1]?.id === value.user) return true});
        if(isInHistoryChat.length){
          router.push(`/conversations/${isInHistoryChat[0].id}`);
          return;
        }
        router.push(`/conversations/new/${value.user}`);
      }}
    />
  );
};

export default EmployeesSearch;
