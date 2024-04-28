import api from "@/utils/api";
import { useQuery } from "react-query";
import { GoalsReportsResDto } from "@/types/goalsReports/goals-reports-res-dto";
import { GoalsListItem } from "@/types/goals";

const fetchGoal = (dataId: number) => async () => {
  const response = await api.get<GoalsListItem>(`employee/goals/${dataId}/`);
  return response.data;
};

export const useGetGoal = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "goals", dataId],
    queryFn: fetchGoal(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
