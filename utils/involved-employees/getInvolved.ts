import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchInvolved = (dataId: number) => async () => {
  const response = await api.get(`employee/clientassignment_rud/${dataId}/`);
  return response.data;
};

export const useGetInvolved = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "involved", dataId],
    queryFn: fetchInvolved(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
