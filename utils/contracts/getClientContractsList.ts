import api from "@/utils/api";
import { ContractsListDto } from "@/types/contracts/contracts-list.dto";
import { useQuery } from "react-query";
import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";

async function getClientContractsList(
  clientId: number,
  params: PaginationParams = DEFAULT_PAGINATION_PARAMS
): Promise<ContractsListDto> {
  const response = await api.get<ContractsListDto>(
    `client/contract_list/${clientId}/`,
    {
      params,
    }
  );
  return response.data;
}

export const useClientContractsList = (
  clientId: number,
  params?: PaginationParams
) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "contracts", params ?? parsedParams],
    queryFn: () => getClientContractsList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
