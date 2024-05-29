import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { RiskAssessementType } from "@/types/questionnaire/risk-assessments-type";

import api from "@/utils/api";
import { useQuery } from "react-query";

type RiskAssessemetsTypeRes = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: RiskAssessementType[];
};

export const getRiskAssessemets = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<RiskAssessemetsTypeRes>(
    `/clients/${clientId}/questionnairs/risk-assessments`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetRiskAssessemets = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "risk-assessements", params ?? parsedParams],
    queryFn: () => getRiskAssessemets(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
