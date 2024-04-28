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
    mutationFn: async (data: GoalsFormType) => {
      return createGoal(clientId, {
        domain_id: +data.domain_id,
        title: data.title,
        desc: data.desc,
      });
    },
    onSuccess: (data: NewGoalsReqDto) => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};
