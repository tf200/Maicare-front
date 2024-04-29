import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteGoal(goalId: number) {
  const response = await api.delete(`/clients/goals/${goalId}/delete`);
  return response.data;
}

export const useDeleteGoal = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};
