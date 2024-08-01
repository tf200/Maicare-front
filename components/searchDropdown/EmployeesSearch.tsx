import React, { FunctionComponent } from "react";
import SearchDropdown from "@/components/searchDropdown/SearchDropdown";
import { useSearchEmployeeOptions } from "@/hooks/useSearchEmployeeOptions";
import { useRouter } from "next/navigation";
import { useMyInfo } from "@/utils/user-info/getUserInfo";

const EmployeesSearch: FunctionComponent = (props) => {
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
        router.push(`/conversations/new/${value.user}`);
      }}
    />
  );
};

export default EmployeesSearch;
