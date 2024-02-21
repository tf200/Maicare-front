import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchInvolvedEmployeesList =
  (clientId: number, params: PaginationParams = DEFAULT_PAGINATION_PARAMS) =>
  async () => {
    const response = await api.get(
      `employee/clientassignment_list/${clientId}/`,
      {
        params,
      }
    );
    return response.data;
  };

export const useInvolvedEmployeesList = (
  clientId: number,
  params?: PaginationParams
) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "employees", params ?? parsedParams],
    queryFn: fetchInvolvedEmployeesList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
