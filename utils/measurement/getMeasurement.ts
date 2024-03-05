import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchMeasurement = (dataId: number) => async () => {
  const response = await api.get(`employee/measurment_rud/${dataId}/`);
  return response.data;
};

export const useGetMeasurement = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "measurement", dataId],
    queryFn: fetchMeasurement(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
