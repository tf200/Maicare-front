import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { GoalsFormType } from "@/components/forms/GoalsReportsForm";
import { NewGoalsReportReqDto } from "@/types/goalsReports/new-goalsReports-req-dto";

export async function GoalReport(data: NewGoalsReportReqDto) {
  const response = await api.post("/employee/goals_report/create/", data);
  return response.data;
}

export const useCreateGoalReport = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: GoalsFormType) => {
      return GoalReport(data);
    },
    onSuccess: (data: NewGoalsReportReqDto) => {
      queryClient.invalidateQueries([client, "goals"]);
    },
  });
};
