import api from "@/utils/api";
import { ContractsListDto } from "@/types/contracts/contracts-list.dto";
import { useQuery } from "react-query";
import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { PaginationParams } from "@/types/pagination-params";

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
  params: PaginationParams = DEFAULT_PAGINATION_PARAMS
) => {
  return useQuery([clientId, "contracts", params], () =>
    getClientContractsList(clientId, params)
  );
};
