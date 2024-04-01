import api from "@/utils/api";
import { useMutation, useQuery } from "react-query";

async function getAutomaticReports() {
  const response = await api.get<Paginated<any>>(
    "employee/weekly-report-summaries/"
  );
  return response.data;
}

export const useAutomaticReports = () => {
  return useQuery("automaticReports", getAutomaticReports);
};

async function generateAutomaticReports() {
  await api.post("employee/weekly-report-summaries/create/");
}

export const useGenerateAutomaticReports = () => {
  return useMutation(generateAutomaticReports);
};
