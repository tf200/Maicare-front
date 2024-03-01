import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteEmergency(clientId: number) {
  const response = await api.delete(`client/emergency_delete/${clientId}/`);
  return response.data;
}

export const useDeleteEmergency = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmergency,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "emergency"]);
    },
  });
};
