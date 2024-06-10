import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchDataSharing = (DataSharingId: number) => async () => {
  const response =
    await api.get(`/clients/questionnairs/data-sharing-statements/${DataSharingId}/details
  `);
  return response.data;
};

export const useGetSingleDataSharing = (DataSharingId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "data-sharing", DataSharingId],
    queryFn: fetchDataSharing(DataSharingId),
    keepPreviousData: true,
    enabled: !!DataSharingId,
  });

  return {
    ...query,
  };
};
