import { ReportType } from "@/types/reports/index";

export type NewReportsReqDto = {
  id?: number;
  title: string;
  report_text: string;
  date?: string;
  type?: ReportType;
  created?: string;
  client?: number;
  author?: string;
};
