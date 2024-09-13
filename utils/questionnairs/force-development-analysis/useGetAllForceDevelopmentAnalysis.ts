import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { ForceDevelopmentAnalysisType } from "@/types/questionnaire/force-development-analysis";
import api from "@/utils/api";
import { useQuery } from "react-query";

type ForceDevelopmentAnalysisTypRes = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: ForceDevelopmentAnalysisType[];
};

export const getAllForceDevelopmentAnalysis = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<ForceDevelopmentAnalysisTypRes>(
    `/clients/${clientId}/questionnaires/force-development-analyses`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetAllForceDevelopmentAnalysis = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "force-development-analyses", params ?? parsedParams],
    queryFn: () => getAllForceDevelopmentAnalysis(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
