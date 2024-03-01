import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewClientsRequest } from "@/types/clients/new-clients-request";

export async function patchClients(data: NewClientsRequest) {
  const formData = new FormData();

  if (typeof data.profile_picture == "string") {
    delete data.profile_picture;
  }

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const response = await api.patch(
    `/client/client_update/${data.id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

export const usePatchClients = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewClientsRequest) => patchClients(data),

    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
