import React, { FunctionComponent } from "react";
import SearchDropdown from "@/components/searchDropdown/SearchDropdown";
import { useSearchEmployeeOptions } from "@/hooks/useSearchEmployeeOptions";
import { useRouter } from "next/navigation";
import { EmployeeResDto } from "@/types/employees/employee-res.dto";

const EmployeesSearch: FunctionComponent = (props) => {
  const { setSearchQuery, options, searchQuery } = useSearchEmployeeOptions();
  const router = useRouter();
  return (
    <SearchDropdown
      options={options}
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
