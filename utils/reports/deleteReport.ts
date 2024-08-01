import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteReport(clientId: number) {
  const response = await api.delete(`employee/progress_report/delete/${clientId}/`);
  return response.data;
}

export const useDeleteReport = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "reports"]);
      queryClient.invalidateQueries([clientId, "infinite-reports"]);
    },
  });
};
