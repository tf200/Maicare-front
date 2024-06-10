import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { DataSharingType } from "@/types/questionnaire/data-sharing";

import api from "@/utils/api";
import { useQuery } from "react-query";

type DataSharingTypeRes = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: DataSharingType[];
};

export const getDataSharing = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<DataSharingTypeRes>(
    `/clients/${clientId}/questionnairs/data-sharing-statements`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetAllDataSharing = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "data-sharing", params ?? parsedParams],
    queryFn: () => getDataSharing(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
