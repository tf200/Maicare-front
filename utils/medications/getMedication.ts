import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchMedication = (dataId: number) => async () => {
  const response = await api.get(`client/medication_retreive/${dataId}/`);
  return response.data;
};

export const useGetMedication = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "medications", dataId],
    queryFn: fetchMedication(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
