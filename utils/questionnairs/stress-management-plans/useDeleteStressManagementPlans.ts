import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteStressManagementPlans(dataId: number) {
  const response = await api.delete(`/clients/questionnaires/stress-management-plans/${dataId}/delete`);
  return response.data;
}

export const useDeleteStressManagementPlans = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStressManagementPlans,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "stress-management-plans"]);
    },
  });
};
