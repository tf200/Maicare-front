import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchEmergency = async (data: any) => {
  const response = await api.patch(`client/emergency_update/${data.id}/`, data);
  return response.data;
};

export const usePatchEmergency = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchEmergency,
    onSuccess: () => {
      queryClient.invalidateQueries(["emergency", clientId]);
    },
  });
};
