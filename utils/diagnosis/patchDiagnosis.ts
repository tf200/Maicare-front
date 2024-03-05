import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchDiagnosis = async (data: any) => {
  const response = await api.patch(`client/diagnosis_update/${data.id}/`, data);
  return response.data;
};

export const usePatchDiagnosis = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchDiagnosis,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "diagnosis"]);
    },
  });
};
