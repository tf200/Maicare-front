import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchStressManagementPlans = (StressManagementPlansId: number) => async () => {
  const response = await api.get(`/clients/questionnaires/stress-management-plans/${StressManagementPlansId}/details
  `);
  return response.data;
};

export const useGetSingleStressManagementPlans = (StressManagementPlansId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "stress-management-plans", StressManagementPlansId],
    queryFn: fetchStressManagementPlans(StressManagementPlansId),
    keepPreviousData: true,
    enabled: !!StressManagementPlansId,
  });

  return {
    ...query,
  };
};
