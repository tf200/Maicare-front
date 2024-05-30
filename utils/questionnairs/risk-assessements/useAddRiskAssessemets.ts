import { RiskAssessementType } from "@/types/questionnaire/risk-assessments-type";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function createRiskAssessements(collab) {
  const response = await api.post<RiskAssessementType>(
    "/clients/questionnairs/risk-assessments/add",
    collab
  );
  return response.data;
}

export const useCreateRiskAssessements = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRiskAssessements,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "risk-assessements"]);
    },
  });
};
