import api from "@/utils/api";
import { useQuery } from "react-query";
import { AnalyticsResDto } from "@/types/analytics";

async function getAnalytics() {
  const response = await api.get<AnalyticsResDto>("/system/dashboard/analytics");
  return response.data;
}

export const useAnalytics = () => {
  return useQuery("analytics", getAnalytics);
};
