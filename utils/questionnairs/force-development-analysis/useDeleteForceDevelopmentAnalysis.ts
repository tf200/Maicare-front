import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";



export const useDeleteForceDevelopmentAnalysis = (clientId: number) => {
  const queryClient = useQueryClient();
  async function deleteForceDevelopmentAnalysis(dataId: number) {
    const response = await api.delete(`/clients/questionnaires/force-development-analysis/${dataId}/delete`);
    return response.data;
  }
  return useMutation({
    mutationFn: deleteForceDevelopmentAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "force-development-analysis"]);
    },
  });
};
