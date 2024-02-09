import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchEmployees = (clientId: string) => async () => {
  const response = await api.get(`client/emergency_list/${clientId}/`);
  return response.data;
};

export const useEmployees = (clientId: string) => {
  const query = useQuery({
    queryKey: [clientId, "employees"],
    queryFn: fetchEmployees(clientId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
