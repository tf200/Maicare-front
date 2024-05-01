import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewGoalsReqDto } from "@/types/goals";
import { GoalsFormType } from "@/types/goals";

export async function createGoal(clientId: number, data: NewGoalsReqDto) {
  const response = await api.post(`/clients/${clientId}/goals/add`, data);
  return response.data;
}

export const useCreateGoal = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NewGoalsReqDto) => {
      return createGoal(clientId, data);
    },
    onSuccess: (data: NewGoalsReqDto) => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};
