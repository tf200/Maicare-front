import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { GoalsFormType } from "@/components/forms/GoalsForm";
import { NewGoalsReqDto } from "@/types/goals/new-goals-req-dto";

export async function createGoal(data: NewGoalsReqDto) {
  const response = await api.post("/employee/goal_create/", data);
  return response.data;
}

export const useCreateGoal = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: GoalsFormType) => {
      return createGoal({
        ...data,
        client,
      });
    },
    onSuccess: (data: NewGoalsReqDto) => {
      queryClient.invalidateQueries([client, "goals"]);
    },
  });
};
