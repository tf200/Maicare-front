import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchIncident = (IncidentId: number) => async () => {
  const response = await api.get(`/clients/incidents/${IncidentId}/details`);
  return response.data;
};

export const useGetIncident = (IncidentId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "incidents", IncidentId],
    queryFn: fetchIncident(IncidentId),
    keepPreviousData: true,
    enabled: !!IncidentId,
  });

  return {
    ...query,
  };
};
