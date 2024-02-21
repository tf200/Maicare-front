import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchEmergencyContacts =
  (clientId: string, params: PaginationParams = DEFAULT_PAGINATION_PARAMS) =>
  async () => {
    const response = await api.get(`client/emergency_list/${clientId}/`, {
      params,
    });
    return response.data;
  };

export const useEmergencyContactList = (
  clientId: string,
  params?: PaginationParams
) => {
  const parsedParams = usePaginationParams();

  const query = useQuery({
    queryKey: [clientId, "emergency", params ?? parsedParams],
    queryFn: fetchEmergencyContacts(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination: parsedParams,
  };
};
