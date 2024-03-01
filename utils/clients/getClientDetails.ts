import api from "@/utils/api";
import { useQuery } from "react-query";
import { ClientDetailsResDto } from "@/types/clients/client-details-res-dto";

export const getClientDetails = async (clientId: number) => {
  const response = await api.get<ClientDetailsResDto>(
    `client/client_details/${clientId}/`
  );
  return response.data;
};

export const useClientDetails = (clientId: number) => {
  return useQuery<ClientDetailsResDto>({
    queryFn: () => getClientDetails(clientId),
    queryKey: ["clients", clientId],
    enabled: !!clientId,
  });
};
