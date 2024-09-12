import { YouthCareIntakeType } from "@/types/questionnaire/youth-care-intake";
import api from "@/utils/api";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";


export const useCreateYouthCareIntake = (clientId: number) => {
  const queryClient = useQueryClient();

  const createYouthCareIntake = useCallback(
    async (values: YouthCareIntakeType) => {
      const response = await api.post<YouthCareIntakeType>(
        `/clients/questionnairs/youth-care-intakes/add`,
        {
          ...values,
          client: clientId,
        }
      );
      return response.data;
    },
    [clientId]
  );

  return useMutation({
    mutationFn: createYouthCareIntake,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "youth-care-intake"]);
    },
  });
};
