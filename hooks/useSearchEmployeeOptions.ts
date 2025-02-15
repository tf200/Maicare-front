import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import { EmployeesResDto } from "@/types/employees/employees-res-dto";

export function useSearchEmployeeOptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useMemo(() => {
    return {
      search: searchQuery,
      out_of_service: false,
    };
  }, [searchQuery]);
  const debouncedParams = useDebounce(searchParams, 300);
  const { data, isLoading } = useEmployeesList(debouncedParams);
  const options = useMemo<
    {
      label: string;
      value: EmployeesResDto;
    }[]
  >(() => {
    if (!data?.results) return [];
    return data.results.map((employee) => ({
      label: employee.first_name + " " + employee.last_name,
      value: employee,
    }));
  }, [data]);
  return { setSearchQuery, options, searchQuery };
}
