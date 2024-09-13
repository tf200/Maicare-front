import api from "@/utils/api";
import { useQuery } from "react-query";



export const useGetForceDevelopmentAnalysis = (ForceDevelopmentAnalysisId: number, clientId: number) => {
  const fetchForceDevelopmentAnalysis = (fetchForceDevelopmentAnalysisId: number) => async () => {
    const response = await api.get(`/clients/questionnaires/force-development-analyses/${fetchForceDevelopmentAnalysisId}/details
    `);
    return response.data;
  };
  const query = useQuery({
    queryKey: [clientId, "force-development-analyses", ForceDevelopmentAnalysisId],
    queryFn: fetchForceDevelopmentAnalysis(ForceDevelopmentAnalysisId),
    keepPreviousData: true,
    enabled: !!ForceDevelopmentAnalysisId,
  });

  return {
    ...query,
  };
};
