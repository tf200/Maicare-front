import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { UpdateClientDto } from "@/types/clients/update-client.dto";
import { ClientsResDto } from "@/types/clients/clients-res-dto";

export async function patchClient(data: UpdateClientDto, clientId: number) {
  const response = await api.patch(`/client/client_update/${clientId}/`, data);

  return response.data;
}

export const usePatchClient = (clientId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateClientDto) => patchClient(data, clientId),

    onSuccess: () => {
      queryClient.invalidateQueries(["clients", clientId]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

async function patchClientProfilePicture(
  profile_picture: ClientsResDto["profile_picture"],
  clientId: number
) {
  const profilePicture = new FormData();
  profilePicture.append("profile_picture", profile_picture);
  const response = await api.patch(
    `/client/client_update/${clientId}/`,
    profilePicture,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );

  return response.data;
}

export const usePatchClientProfilePicture = (
  clientId: number,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile_picture: ClientsResDto["profile_picture"]) =>
      patchClientProfilePicture(profile_picture, clientId),

    onSuccess: () => {
      queryClient.invalidateQueries(["clients", clientId]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
