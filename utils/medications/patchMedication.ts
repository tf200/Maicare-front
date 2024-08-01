import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchMedication = async (data: any) => {
  const response = await api.patch(`client/medication_update/${data.id}/`, data);
  return response.data;
};

export const usePatchMedication = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchMedication,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "medications"]);
    },
  });
};
