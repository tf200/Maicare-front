import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchRiskAssessements = (RiskAssessementsId: number) => async () => {
  const response =
    await api.get(`/clients/questionnairs/risk-assessments/${RiskAssessementsId}/details
  `);
  return response.data;
};

export const useGetSingleRiskAssessements = (RiskAssessementsId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "risk-assessements", RiskAssessementsId],
    queryFn: fetchRiskAssessements(RiskAssessementsId),
    keepPreviousData: true,
    enabled: !!RiskAssessementsId,
  });

  return {
    ...query,
  };
};
