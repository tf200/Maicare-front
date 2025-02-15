import api from "@/utils/api";
import { MedicationsListResDto } from "@/types/medications/medications-list-res-dto";
import { useQuery } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";

async function fetchMedicationsList(clientId: number, params: PaginationParams) {
  const response = await api.get<MedicationsListResDto>(`/clients/${clientId}/medications`, {
    params,
  });
  return response.data;
}

export const useMedicationsList = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryFn: () => fetchMedicationsList(clientId, params ?? parsedParams),
    queryKey: [clientId, "medications", params ?? parsedParams],
    keepPreviousData: true,
    getPreviousPageParam: (data) => data.previous,
    getNextPageParam: (data) => data.next,
  });

  return {
    ...query,
    pagination,
  };
};
