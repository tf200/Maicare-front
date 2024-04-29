import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteGoalReport(clientId: number) {
  const response = await api.delete(`employee/goals_report/${clientId}/`);
  return response.data;
}

export const useDeleteGoalReport = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGoalReport,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};
