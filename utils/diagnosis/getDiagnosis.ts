import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchDiagnosis = (dataId: number) => async () => {
  const response = await api.get(`client/diagnosis_retreive/${dataId}/`);
  return response.data;
};

export const useGetDiagnosis = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "diagnosis", dataId],
    queryFn: fetchDiagnosis(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
