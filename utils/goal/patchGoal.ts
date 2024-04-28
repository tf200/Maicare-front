import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { UpdateGoalReqDto } from "@/types/goals";

const patchGoal = async (goalId: number, data: UpdateGoalReqDto) => {
  const response = await api.patch(`clients/goals/${goalId}/update`, data);
  return response.data;
};

export const usePatchGoal = (clientId: number, goalId: number) => {
  console.log("clientId", clientId, "goalId", goalId);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateGoalReqDto) => patchGoal(goalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};
