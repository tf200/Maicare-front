import { EmployeesListResDto } from "@/types/employees/employees-list-res-dto";
import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";
import { ClientsSearchParams } from "@/types/clients/clients-search-params";

const fetchEmployees =
  (params?: ClientsSearchParams, page = 1) =>
  async () => {
    const res = await api.get<EmployeesListResDto>(`employee/employees_list/`, {
      params: {
        page,
        ...params,
      },
    });
    return res.data;
  };

export const useEmployeesList = (params?: ClientsSearchParams) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: ["employees", { page, ...params }],
    queryFn: fetchEmployees(params, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
