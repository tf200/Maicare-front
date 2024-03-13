import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewClientsRequest } from "@/types/clients/new-clients-request";

export async function createClients(data: NewClientsRequest) {
  const response = await api.post("/client/client_create/", data);
  return response.data;
}

export const useCreateClients = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewClientsRequest) => createClients(data),

    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
