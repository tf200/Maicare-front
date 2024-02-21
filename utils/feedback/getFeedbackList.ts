import api from "@/utils/api";
import { useQuery } from "react-query";
import { FeedbackListResDto } from "@/types/feedback/feedback-list-res-dto";
import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";

async function getFeedbackList(
  clientId: number,
  params: PaginationParams = DEFAULT_PAGINATION_PARAMS
) {
  const res = await api.get<FeedbackListResDto>(
    `employee/feedback_list/${clientId}`,
    {
      params,
    }
  );
  return res.data;
}

export const useFeedbackList = (
  clientId: number,
  params?: PaginationParams
) => {
  const parsedParams = usePaginationParams();

  const query = useQuery<FeedbackListResDto>({
    queryKey: [clientId, "feedback", params ?? parsedParams],
    queryFn: () => getFeedbackList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination: parsedParams,
  };
};
