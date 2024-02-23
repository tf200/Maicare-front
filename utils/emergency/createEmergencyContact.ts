import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export async function createEmergencyContact(data: {}) {
  const response = await api.post("/client/emergency_create/", data);
  return response.data;
}

export const useCreateEmergencyContact = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {}) => {
      return createEmergencyContact({
        ...data,
        client,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([client, "emergency"]);
    },
  });
};
