import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchEmployees = () => async () => {
  const response = await api.get(`/employee/employees_list/`);
  return response.data;
};

export const useEmployees = () => {
  const query = useQuery({
    queryKey: ["involved"],
    queryFn: fetchEmployees(),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
