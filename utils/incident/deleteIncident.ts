import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteIncident(dataId: number) {
  const response = await api.delete(`employee/incidents/${dataId}/`);
  return response.data;
}

export const useDeleteIncident = (dataId: number, clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteIncident,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "incidents"]);
    },
  });
};
