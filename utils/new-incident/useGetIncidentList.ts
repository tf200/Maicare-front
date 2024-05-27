import { usePaginationParams } from "@/hooks/usePaginationParams";
import { NewIncidentType } from "@/types/incidents";
import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { useQuery } from "react-query";

export type IncidentListType = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: NewIncidentType[];
};

export const getIncidentList = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<IncidentListType>(`/clients/${clientId}/incidents`, {
    params,
  });
  return response.data;
};

export const useGetIncidentList = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "incidents", params ?? parsedParams],
    queryFn: () => getIncidentList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
