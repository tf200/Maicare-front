import api from "@/utils/api";
import { PaginationParams } from "@/types/pagination-params";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { useQuery } from "react-query";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { ActivityLogRes } from "@/types/activity_logs";

async function getActivityLogs(params: PaginationParams) {
  const response = await api.get<ActivityLogRes>("/system/logs/activities", {
    params: cleanQueryParams(params),
  });
  return response.data;
}

export const useActivityLogs = () => {
  const pagination = usePaginationParams();
  const query = useQuery(
    "activity_logs",
    () => getActivityLogs(pagination.params),
    {
      keepPreviousData: true,
    }
  );

  return {
    ...query,
    pagination,
  };
};
