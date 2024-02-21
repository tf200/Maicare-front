import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { ReportsListResDto } from "@/types/reports/reports-list-res-dto";
import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchReportsList =
  (clientId: number, params: PaginationParams = DEFAULT_PAGINATION_PARAMS) =>
  async () => {
    const response = await api.get<ReportsListResDto>(
      `employee/progress_report/list/${clientId}/`,
      {
        params,
      }
    );
    return response.data;
  };

export const useReportsList = (clientId: number, params?: PaginationParams) => {
  const parsedParams = usePaginationParams();

  const query = useQuery({
    queryKey: [clientId, "reports", params ?? parsedParams],
    queryFn: fetchReportsList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination: parsedParams,
  };
};
