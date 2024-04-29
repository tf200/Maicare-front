import api from "@/utils/api";
import { ContractsListDto } from "@/types/contracts/contracts-list.dto";
import { useQuery } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { ContractSearchParams } from "@/types/contracts";
import { cleanQueryParams } from "@/utils/cleanQueryParams";

async function getContractsList(
  params: PaginationParams & ContractSearchParams
): Promise<ContractsListDto> {
  const response = await api.get<ContractsListDto>(`clients/contracts`, {
    params: cleanQueryParams(params),
  });
  return response.data;
}

export const useContractsList = (params?: ContractSearchParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [
      "contracts",
      {
        ...parsedParams,
        ...params,
      },
    ],
    queryFn: () =>
      getContractsList({
        ...parsedParams,
        ...params,
      }),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
