import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchObservation = (dataId: number) => async () => {
  const response = await api.get(`employee/observations_rud/${dataId}/`);
  return response.data;
};

export const useGetObservation = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "observations", dataId],
    queryFn: fetchObservation(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
