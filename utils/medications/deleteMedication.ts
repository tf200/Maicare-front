import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteMedication(clientId: number) {
  const response = await api.delete(`client/medication_delete/${clientId}/`);
  return response.data;
}

export const useDeleteMedication = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "medications"]);
    },
  });
};
