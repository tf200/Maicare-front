import api from "@/utils/api";
import { useQuery } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { IncidentListResDto } from "@/types/incidents/incident-list-res-dto";

async function getIncidentsList(clientId: number, params: PaginationParams) {
  const response = await api.get<IncidentListResDto>(`employee/incidents/by-child/${clientId}`, {
    params,
  });
  return response.data;
}

/**
 *
 * @param clientId
 * @param params Override pagination params
 */
export const useIncidentList = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery<IncidentListResDto>({
    queryKey: [clientId, "incidents", params ?? parsedParams],
    queryFn: () => getIncidentsList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
