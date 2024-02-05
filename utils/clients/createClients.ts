import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewClientsRequest } from "@/types/clients/new-clients-request";

export async function createClients(data: NewClientsRequest) {
  const formData = new FormData();

  formData.append("profile_picture", data.profile_picture);

  delete data.profile_picture;

  Object.keys(data).forEach((key) => {
    if (key !== "profile_picture") {
      formData.append(key, String(data[key]));
    }
  });

  // Append other client data fields to formData
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key].toString());
  });

  const response = await api.post("/client/client_create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  return response.data;
}

export const useCreateClients = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: NewClientsRequest) => createClients(data),

    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["clients"]);
      if (onSuccess) {
        onSuccess(); // Call the provided onSuccess callback
      }
    },
  });
};
