import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteYouthCareIntake(dataId: number) {
  const response = await api.delete(`/clients/questionnaires/youth-care-intakes/${dataId}/delete`);
  return response.data;
}

export const useDeleteYouthCareIntake = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteYouthCareIntake,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "youth-care-intake"]);
    },
  });
};
