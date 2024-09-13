import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { YouthCareIntakeType } from "@/types/questionnaire/youth-care-intake";
import api from "@/utils/api";
import { useQuery } from "react-query";

type YouthCareIntakeTypeRes = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: YouthCareIntakeType[];
};

export const getAllYouthCareIntakes = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<YouthCareIntakeTypeRes>(
    `/clients/${clientId}/questionnairs/youth-care-intakes`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetAllYouthCareIntakes = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "youth-care-intake", params ?? parsedParams],
    queryFn: () => getAllYouthCareIntakes(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
