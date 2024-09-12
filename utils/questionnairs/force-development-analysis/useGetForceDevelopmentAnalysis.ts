import api from "@/utils/api";
import { useQuery } from "react-query";



export const useGetForceDevelopmentAnalysis = (ForceDevelopmentAnalysisId: number, clientId: number) => {
  const fetchForceDevelopmentAnalysis = (fetchForceDevelopmentAnalysisId: number) => async () => {
    const response = await api.get(`/clients/${clientId}/questionnaires/force-development-analysis/${fetchForceDevelopmentAnalysisId}/details
    `);
    return response.data;
  };
  const query = useQuery({
    queryKey: [clientId, "force-development-analysis", ForceDevelopmentAnalysisId],
    queryFn: fetchForceDevelopmentAnalysis(ForceDevelopmentAnalysisId),
    keepPreviousData: true,
    enabled: !!ForceDevelopmentAnalysisId,
  });

  return {
    ...query,
  };
};
