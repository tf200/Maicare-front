import React, { FunctionComponent } from "react";
import SearchDropdown from "@/components/searchDropdown/SearchDropdown";
import { useSearchEmployeeOptions } from "@/hooks/useSearchEmployeeOptions";

const EmployeesSearch: FunctionComponent = (props) => {
  const { setSearchQuery, options, searchQuery } = useSearchEmployeeOptions();
  return (
    <SearchDropdown
      options={searchQuery ? options : []}
      placeholder={"Zoeken..."}
      handleQueryChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

export default EmployeesSearch;
