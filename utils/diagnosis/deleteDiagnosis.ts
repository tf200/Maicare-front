import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteDiagnosis(clientId: number) {
  const response = await api.delete(`client/diagnosis_delete/${clientId}/`);
  return response.data;
}

export const useDeleteDiagnosis = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDiagnosis,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "diagnosis"]);
    },
  });
};
