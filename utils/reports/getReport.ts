import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchReport = (dataId: number) => async () => {
  const response = await api.get(`employee/progress_report/retrieve/${dataId}/`);
  return response.data;
};

export const useGetReport = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "reports", dataId],
    queryFn: fetchReport(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
