import api from "@/utils/api";
import { MedicationsListResDto } from "@/types/medications/medications-list-res-dto";
import { useState } from "react";
import { useQuery } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import pagination from "@/components/Pagination";
import { usePaginationParams } from "@/hooks/usePaginationParams";

async function fetchMedicationsList(
  clientId: number,
  params: PaginationParams
) {
  const response = await api.get<MedicationsListResDto>(
    `client/medication_list/${clientId}/`,
    {
      params,
    }
  );
  return response.data;
}

export const useMedicationsList = (
  clientId: number,
  params?: PaginationParams
) => {
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
