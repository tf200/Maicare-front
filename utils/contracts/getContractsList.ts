import api from "@/utils/api";
import { ContractsListDto } from "@/types/contracts/contracts-list.dto";
import { useQuery } from "react-query";
import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";

async function getContractsList(
  params: PaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<ContractsListDto> {
  const response = await api.get<ContractsListDto>(`clients/contracts`, {
    params,
  });
  return response.data;
}

export const useContractsList = (params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: ["contracts", params ?? parsedParams],
    queryFn: () => getContractsList(params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
