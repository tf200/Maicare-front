import { StressManagementPlansType } from "@/types/questionnaire/stress-management-plans";
import api from "@/utils/api";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";


export const useCreateStressManagementPlans = (clientId: number) => {
  const queryClient = useQueryClient();

  const createStressManagementPlans = useCallback(
    async (values: StressManagementPlansType) => {
      const response = await api.post<StressManagementPlansType>(
        `/clients/${clientId}/questionnaires/stress-management-plans/add`,
        values
      );
      return response.data;
    },
    [clientId]
  );

  return useMutation({
    mutationFn: createStressManagementPlans,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "stress-management-plans"]);
    },
  });
};
