import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchGoal = async (data: any) => {
  const response = await api.patch(`employee/goals/${data.id}/`, data);
  return response.data;
};

export const usePatchGoal = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchGoal,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};
