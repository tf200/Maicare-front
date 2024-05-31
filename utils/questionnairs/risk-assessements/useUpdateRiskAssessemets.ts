import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const UpdateRiskAssessements = async (data: any) => {
  const response = await api.post(
    `/clients/questionnairs/risk-assessments/${data.id}/update`,
    data
  );
  return response.data;
};

export const useUpdateRiskAssessements = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateRiskAssessements,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "risk-assessements"]);
    },
  });
};
