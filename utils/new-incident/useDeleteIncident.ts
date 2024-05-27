import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteIncident(dataId: number) {
  const response = await api.delete(`clients/incidents/${dataId}/delete`);
  return response.data;
}

export const useDeleteIncident = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteIncident,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "incidents"]);
    },
  });
};
