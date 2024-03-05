import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchEmergencyContact = async (data: any) => {
  const response = await api.patch(`client/emergency_update/${data.id}/`, data);
  return response.data;
};

export const usePatchEmergencyContact = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchEmergencyContact,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "emergency"]);
    },
  });
};
