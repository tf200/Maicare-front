import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchInvolvedEmployee = async (data: any) => {
  const response = await api.patch(`employee/clientassignment_rud/${data.id}/`, data);
  return response.data;
};

export const usePatchInvolvedEmployee = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchInvolvedEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "involved"]);
    },
  });
};
