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

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const EmployeesTagInput: FunctionComponent<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useMemo(() => {
    return {
      search: searchQuery,
      out_of_service: false,
    };
  }, [searchQuery]);
  const debouncedParams = useDebounce(searchParams, 300);
  const { data, isLoading } = useEmployeesList(debouncedParams);
  const options = useMemo(() => {
    if (!data?.results) return [];
    return data.results.map((employee) => ({
      label: employee.first_name + " " + employee.last_name,
      value: employee,
    }));
  }, [data]);
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
