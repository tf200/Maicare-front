import api from "@/utils/api";
import { useQuery } from "react-query";

export type DomainGoalFilters = {
  selected_assessment_id: number;
};

const fetchGoalsList =
  (
    clientId: number,
  ) =>
    async () => {
      const response = await api.get(`/clients/${clientId}/all-goals`);
      return response.data;
    };

export const useGoalsList = (clientId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: [clientId, "goals"],
    queryFn: fetchGoalsList(clientId),
    keepPreviousData: true,
    enabled: !!clientId,
  });

  return {
    goals: data,
    ...rest,
  };
};
