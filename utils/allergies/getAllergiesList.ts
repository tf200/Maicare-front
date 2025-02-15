import api from "@/utils/api";
import { AllergiesListResDto } from "@/types/allergies/allergies-list-res-dto";
import { useQuery } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";

async function getAllergiesList(clientId: number, params: PaginationParams) {
  const response = await api.get<AllergiesListResDto>(`client/allergy_list/${clientId}`, {
    params,
  });
  return response.data;
}

/**
 *
 * @param clientId
 * @param params Override pagination params
 */
export const useAllergiesList = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery<AllergiesListResDto>({
    queryKey: [clientId, "allergies", params ?? parsedParams],
    queryFn: () => getAllergiesList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
