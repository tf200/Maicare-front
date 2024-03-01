import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteObservations(clientId: number) {
  const response = await api.delete(`employee/observations_rud/${clientId}/`);
  return response.data;
}

export const useDeleteObservations = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteObservations,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "observations"]);
    },
  });
};
