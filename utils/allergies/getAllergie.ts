import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchAllergie = (dataId: number) => async () => {
  const response = await api.get(`client/allergy_retrieve/${dataId}/`);
  return response.data;
};

export const useGetAllergie = (dataId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "allergies", dataId],
    queryFn: fetchAllergie(dataId),
    keepPreviousData: true,
  });

  return {
    ...query,
  };
};
