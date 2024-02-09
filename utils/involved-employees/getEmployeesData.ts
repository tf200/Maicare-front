import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchEmployees = (clientId: number) => async () => {
  const response = await api.get(`/employee/employees_list/`);
  return response.data;
};

export const useEmployees = (clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "employees"],
    queryFn: fetchEmployees(clientId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
