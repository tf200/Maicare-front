import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteClient(clientId: number) {
  const response = await api.delete(`client/client_delete/${clientId}/`);
  return response.data;
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
    },
  });
};
