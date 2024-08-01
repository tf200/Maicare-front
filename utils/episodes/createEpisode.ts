import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { EpisodesResDto } from "@/types/episodes/episodes-res-dto";
import { NewEpisodeReqDto } from "@/types/episodes/new-episode-req-dto";

async function createEpisode(episode: NewEpisodeReqDto): Promise<EpisodesResDto> {
  const response = await api.post<EpisodesResDto>("employee/emotionalstate_cl/", episode);
  return response.data;
}

export const useCreateEpisode = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEpisode,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "episodes"]);
    },
  });
};
