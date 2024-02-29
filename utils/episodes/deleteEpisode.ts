import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteEpisode(clientId: number) {
  const response = await api.delete(`employee/emotionalstate_rud/${clientId}/`);
  return response.data;
}

export const useDeleteEpisode = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEpisode,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "episodes"]);
    },
  });
};
