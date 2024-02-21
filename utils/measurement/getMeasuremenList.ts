import api from "@/utils/api";
import { useQuery } from "react-query";
import { useState } from "react";
import { MeasurmentListResDto } from "@/types/measurment/measurment-list-res-dto";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { DEFAULT_PAGINATION_PARAMS } from "@/consts";

async function getMeasurementList(
  clientId: number,
  params: PaginationParams = DEFAULT_PAGINATION_PARAMS
) {
  const res = await api.get<MeasurmentListResDto>(
    `employee/measurment_list/${clientId}`,
    {
      params,
    }
  );
  return res.data;
}

export const useMeasurementList = (
  clientId: number,
  params?: PaginationParams
) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery<MeasurmentListResDto>({
    queryKey: [clientId, "measurment", params ?? parsedParams],
    queryFn: () => getMeasurementList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
