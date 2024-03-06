import React, {
  FunctionComponent,
  InputHTMLAttributes,
  useMemo,
  useState,
} from "react";
import FormikTagInput from "@/components/FormFields/FormikTagInput";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import { useDebounce } from "@/hooks/useDebounce";
import { useEmployeeDetails } from "@/utils/employees/getEmployeeDetails";
import { useSearchEmployeeOptions } from "@/hooks/useSearchEmployeeOptions";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const EmployeesTagInput: FunctionComponent<Props> = (props) => {
  const { setSearchQuery, options, searchQuery } = useSearchEmployeeOptions();
  return (
    <FormikTagInput
      {...props}
      options={searchQuery ? options : []}
      handleQueryChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      renderTag={(tagId) => <EmployeeTag id={tagId} />}
    />
  );
};

export default EmployeesTagInput;

const EmployeeTag: FunctionComponent<{ id: number }> = ({ id }) => {
  const { data, isLoading } = useEmployeeDetails(id);
  return (
    <div>
      {isLoading ? "Loading..." : data?.first_name + " " + data?.last_name}
    </div>
  );
};
