import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { ReportsFormType } from "@/components/forms/ReportsForm";
import { ReportsResDto } from "@/types/reports/reports-res-dto";
import { NewReportsReqDto } from "@/types/reports/new-reports-req-dto";

export async function createReports(data: NewReportsReqDto) {
  const response = await api.post("/employee/progress_report/create/", data);
  return response.data;
}

export const useCreateReports = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ReportsFormType) => {
      return createReports({
        ...data,
        client,
      });
    },
    onSuccess: (data: ReportsResDto) => {
      queryClient.invalidateQueries([client, "reports"]);
    },
  });
};
