import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { ObservationsListResDto } from "@/types/observations/observations-list-res-dto";
import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { useQuery } from "react-query";

async function fetchObservationsList(
  clientId: number,
  params: PaginationParams = DEFAULT_PAGINATION_PARAMS
) {
  const response = await api.get<ObservationsListResDto>(
    `employee/observations_list/${clientId}/`,
    {
      params,
    }
  );
  return response.data;
}

export const useObservationsList = (
  clientId: number,
  params?: PaginationParams
) => {
  const parsedParams = usePaginationParams();

  const query = useQuery({
    queryFn: () => fetchObservationsList(clientId, params ?? parsedParams),
    queryKey: [clientId, "observations", params ?? parsedParams],
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination: parsedParams,
  };
};
