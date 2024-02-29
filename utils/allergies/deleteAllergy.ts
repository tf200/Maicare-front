import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteAllergy(clientId: number) {
  const response = await api.delete(`client/allergy_delete/${clientId}/`);
  return response.data;
}

export const useDeleteAllergy = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllergy,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "allergies"]);
    },
  });
};
