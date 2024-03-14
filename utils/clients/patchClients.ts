import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewClientsRequest } from "@/types/clients/new-clients-request";

export async function patchClients(data: NewClientsRequest, clientId: number) {
  const response = await api.patch(`/client/client_update/${clientId}/`, data);

  return response.data;
}

export const usePatchClients = (clientId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewClientsRequest) => patchClients(data, clientId),

    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
