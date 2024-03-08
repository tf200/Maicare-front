import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { GoalsListResDto } from "@/types/goals/goals-list-res-dto";
import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchGoalsList =
  (clientId: number, params: PaginationParams = DEFAULT_PAGINATION_PARAMS) =>
  async () => {
    const response = await api.get<GoalsListResDto>(
      `employee/goals_list/${clientId}/`,
      {
        params,
      }
    );
    return response.data;
  };

export const useGoalsList = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "goals", params ?? parsedParams],
    queryFn: fetchGoalsList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
