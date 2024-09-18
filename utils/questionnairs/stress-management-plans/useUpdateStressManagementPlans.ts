import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const UpdateStressManagementPlans = async (data: any) => {
  const response = await api.post(
    `/clients/questionnaires/stress-management-plans/${data.id}/update`,
    data
  );
  return response.data;
};

export const useUpdateStressManagementPlans = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateStressManagementPlans,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "stress-management-plans"]);
    },
  });
};
