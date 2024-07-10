import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { GoalsListResDto } from "@/types/goals";
import api from "@/utils/api";
import { useQuery } from "react-query";

export type DomainGoalFilters = {
  selected_assessment_id: number;
};

const fetchGoalsList =
  (
    clientId: number,
    params: PaginationParams & DomainGoalFilters = {
      ...DEFAULT_PAGINATION_PARAMS,
      selected_assessment_id: 0,
    }
  ) =>
  async () => {
    const response = await api.get<GoalsListResDto>(`/clients/${clientId}/goals`, {
      params,
    });
    return response.data;
  };

export const useGoalsList = (clientId: number, params?: PaginationParams & DomainGoalFilters) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const new_params = {
    ...parsedParams,
    ...params,
    selected_assessment_id: params?.selected_assessment_id ?? 0,
  };

  const query = useQuery({
    queryKey: [clientId, "goals", new_params],
    queryFn: fetchGoalsList(clientId, new_params),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
