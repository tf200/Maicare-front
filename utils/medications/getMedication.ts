import api from "@/utils/api";
import { useQuery } from "react-query";
import { MedicationsResDto } from "@/types/medications/medications-res-dto";

const fetchMedication = (dataId: number) => async () => {
  const response = await api.get<MedicationsResDto>(
    `client/medication_retreive/${dataId}/`
  );
  return response.data;
};

export const useGetMedication = (dataId: number, clientId?: number) => {
  const query = useQuery({
    queryKey: clientId
      ? [clientId, "medications", dataId]
      : ["medications", dataId],
    queryFn: fetchMedication(dataId),
    keepPreviousData: true,
    enabled: !!dataId,
  });

  return {
    ...query,
  };
};
