import { ReportsListResDto } from "@/types/reports/reports-list-res-dto";
import api from "@/utils/api";
import { useInfiniteQuery } from "react-query";

const fetchReportsInfiniteList =
  (clientId: number) =>
  async ({
    pageParam,
  }: {
    pageParam?: Paginated<unknown>["next"] | Paginated<unknown>["previous"];
  }) => {
    const response = await api.get<ReportsListResDto>(
      pageParam ?? `employee/progress_report/list/${clientId}/`
    );
    return response.data;
  };

export const useReportsInfiniteList = (clientId: number) => {
  return useInfiniteQuery({
    queryKey: [clientId, "infinite-reports"],
    queryFn: fetchReportsInfiniteList(clientId),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (lastPage) => lastPage.previous,
  });
};
