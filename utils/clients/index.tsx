import api from "@/utils/api";
import { ClientStatusList } from "@/types/clients";
import { useQuery } from "react-query";

async function getClientStatusHistory(clientId: number) {
  const response = await api.get<ClientStatusList>(
    `/clients/${clientId}/profile-status-history`
  );
  return response.data;
}

export const useClientStatusHistory = (clientId: number) => {
  return useQuery({
    queryKey: ["clients", clientId, "status-history"],
    queryFn: () => getClientStatusHistory(clientId),
  });
};
