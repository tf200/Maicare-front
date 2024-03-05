import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchEpisode = (episodeId: number) => async () => {
  const response = await api.get(`employee/emotionalstate_rud/${episodeId}/`);
  return response.data;
};

export const useGetEpisode = (episodeId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "episodes", episodeId],
    queryFn: fetchEpisode(episodeId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
