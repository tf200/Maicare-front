import { ForceDevelopmentAnalysisType } from "@/types/questionnaire/force-development-analysis";
import api from "@/utils/api";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";


export const useCreateForceDevelopmentAnalysis = (clientId: number) => {
  const queryClient = useQueryClient();

  const createYouthCareIntake = useCallback(
    async (values: ForceDevelopmentAnalysisType) => {
      const response = await api.post<ForceDevelopmentAnalysisType>(
        `/clients/${clientId}/questionnaires/force-development-analyses/add`,
        values,
      );
      return response.data;
    },
    [clientId]
  );

  return useMutation({
    mutationFn: createYouthCareIntake,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "force-development-analyses"]);
    },
  });
};
