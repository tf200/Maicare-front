import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchYouthCareIntake = (YouthCareIntakeId: number) => async () => {
  const response = await api.get(`/clients/questionnairs/youth-care-intakes/${YouthCareIntakeId}/details
  `);
  return response.data;
};

export const useGetSingleYouthCareIntake = (YouthCareIntakeId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "youth-care-intake", YouthCareIntakeId],
    queryFn: fetchYouthCareIntake(YouthCareIntakeId),
    keepPreviousData: true,
    enabled: !!YouthCareIntakeId,
  });

  return {
    ...query,
  };
};
