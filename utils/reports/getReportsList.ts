import { ReportsListResDto } from "@/types/reports/reports-list-res-dto";
import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchReportsList =
  (clientId: number, page = 1) =>
  async () => {
    const response = await api.get<ReportsListResDto>(
      `employee/progress_report/list/${clientId}/`,
      {
        params: {
          page,
        },
      }
    );
    return response.data;
  };

export const useReportsList = (clientId: number) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: [clientId, "reports", page],
    queryFn: fetchReportsList(clientId, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
