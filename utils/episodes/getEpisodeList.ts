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
  const parsedParams = usePaginationParams();

  const query = useQuery<EpisodesListResDto>({
    queryKey: [
      clientId,
      "episodes",
      params ?? {
        page: parsedParams.page,
        page_size: parsedParams.page_size,
      },
    ],
    queryFn: () =>
      getEpisodeList(
        clientId,
        params ?? {
          page: parsedParams.page,
          page_size: parsedParams.page_size,
        }
      ),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination: parsedParams,
  };
};
