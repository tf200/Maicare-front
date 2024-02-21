import api from "@/utils/api";
import { DiagnosisListResDto } from "@/types/diagnosis/diagnosis-list-res-dto";
import { useState } from "react";
import { useQuery } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { DEFAULT_PAGINATION_PARAMS } from "@/consts";

const fetchDiagnosis =
  (clientId: number, params: PaginationParams = DEFAULT_PAGINATION_PARAMS) =>
  async () => {
    const response = await api.get<DiagnosisListResDto>(
      `client/diagnosis_list/${clientId}/`,
      {
        params,
      }
    );
    return response.data;
  };

export const useDiagnosisList = (
  clientId: number,
  params?: PaginationParams
) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "diagnosis", params ?? parsedParams],
    queryFn: fetchDiagnosis(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
