import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteRiskAssessements(dataId: number) {
  const response = await api.delete(`/clients/questionnairs/risk-assessments/${dataId}/delete`);
  return response.data;
}

export const useDeleteRiskAssessements = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRiskAssessements,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "risk-assessements"]);
    },
  });
};
