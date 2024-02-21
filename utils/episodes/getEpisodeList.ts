import api from "@/utils/api";
import { useQuery } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { EpisodesListResDto } from "@/types/episodes/episodes-list-res-dto";

async function getEpisodeList(clientId: number, params: PaginationParams) {
  const response = await api.get<EpisodesListResDto>(
    `employee/emotionalstate_list/${clientId}`,
    {
      params,
    }
  );
  return response.data;
}

/**
 *
 * @param clientId
 * @param params Override pagination params
 */
export const useEpisodesList = (
  clientId: number,
  params?: PaginationParams
) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery<EpisodesListResDto>({
    queryKey: [clientId, "episodes", params ?? parsedParams],
    queryFn: () => getEpisodeList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
