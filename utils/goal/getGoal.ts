import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchGoal = (dataId: number) => async () => {
  const response = await api.get(`employee/goals/${dataId}/`);
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
