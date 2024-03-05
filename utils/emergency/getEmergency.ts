import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchEmergency = (DataId: number) => async () => {
  const response = await api.get(`client/emergency_retreive/${DataId}/`);
  return response.data;
};

export const useGetEmergency = (DataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "emergency", DataId],
    queryFn: fetchEmergency(DataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
