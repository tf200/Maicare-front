import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchEpisode = async (data: any) => {
  const response = await api.patch(`employee/emotionalstate_rud/${data.id}/`, data);
  return response.data;
};

export const usePatchEpisode = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchEpisode,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "episodes"]);
    },
  });
};
