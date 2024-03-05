import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchReport = async (data: any) => {
  const response = await api.patch(`employee/progress_report/update/${data.id}/`, data);
  return response.data;
};

export const usePatchReport = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchReport,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "reports"]);
      queryClient.invalidateQueries([clientId, "infinite-reports"]);
    },
  });
};
