import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteFeedback(clientId: number) {
  const response = await api.delete(`employee/feedback_rud/${clientId}/`);
  return response.data;
}

export const useDeleteFeedback = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "feedback"]);
    },
  });
};
