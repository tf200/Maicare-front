import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchCollab = (CollabId: number) => async () => {
  const response =
    await api.get(`/clients/questionnairs/collaboration_agreements/${CollabId}/details
  `);
  return response.data;
};

export const useGetSingleColab = (CollabId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "collaboration-agreement", CollabId],
    queryFn: fetchCollab(CollabId),
    keepPreviousData: true,
    enabled: !!CollabId,
  });

  return {
    ...query,
  };
};
