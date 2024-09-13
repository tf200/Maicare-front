import api from "@/utils/api";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";



export const useUpdateForceDevelopmentAnalysis = (clientId: number, ForceDevelopmentAnalysisId: number) => {
  const UpdateForceDevelopmentAnalysis = useCallback(async (data: any) => {
    const response = await api.post(
      `/clients/questionnaires/force-development-analyses/${ForceDevelopmentAnalysisId}/update`,
      data,
      );
    return response.data;
  }, []);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateForceDevelopmentAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "force-development-analyses", ForceDevelopmentAnalysisId ]);
    },
  });
};
