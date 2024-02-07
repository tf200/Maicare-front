import api from "@/utils/api";
import { useQuery } from "react-query";
import { ReportsListResDto } from "@/types/reports/reports-list-res-dto";

async function getLatestReports(clientId: number, numberOfItems: number) {
  const res = await api.get<ReportsListResDto>(
    `employee/progress_report/list/${clientId}/`,
    {
      params: {
        page: 1,
        ordering: "-date_of_diagnosis",
        page_size: numberOfItems,
      },
    }
  );

  const { results } = res.data;

  return results;
}

export const useLatestReports = (
  clientId: number,
  numberOfItems: number = 3
) => {
  return useQuery({
    queryFn: () => getLatestReports(clientId, numberOfItems),
    queryKey: [clientId, "latest_reports"],
  });
};
