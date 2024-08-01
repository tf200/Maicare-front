import { EnhanceReportReqDto, EnhanceReportResDto } from "@/types/report-enhancement";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

async function enhanceReport(data: EnhanceReportReqDto) {
  const response = await api.post<EnhanceReportResDto>("/ai/enhance-report", data);
  return response.data;
}

export const useEnhanceReport = () => {
  const queryClient = useQueryClient();
  return useMutation(enhanceReport, {
    onSuccess: (response) => {
      queryClient.setQueryData("enhancedReport", response);
    },
  });
};

export const useEnhancedReport = () => {
  return useQuery<EnhanceReportResDto | undefined>("enhancedReport");
};

export const useClearEnhancedReport = () => {
  const queryClient = useQueryClient();
  return () => queryClient.removeQueries("enhancedReport");
};
