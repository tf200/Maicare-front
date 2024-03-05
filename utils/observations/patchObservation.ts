import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchObservation = async (data: any) => {
  const response = await api.patch(`employee/observations_rud/${data.id}/`, data);
  return response.data;
};

export const usePatchObservation = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchObservation,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "observations"]);
    },
  });
};
