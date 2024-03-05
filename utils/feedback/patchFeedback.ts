import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchFeedback = async (data: any) => {
  const response = await api.patch(`employee/feedback_rud/${data.id}/`, data);
  return response.data;
};

export const usePatchFeedback = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "feedback"]);
    },
  });
};
