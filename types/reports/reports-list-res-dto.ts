import { ReportType } from "@/types/reports/index";

export type ReportsListItem = {
  id: number;
  date: string;
  created: string;
  report_text: string;
  client: number;
  title: string;
  author: string;
  full_name: string;
  profile_picture: string;
  type: ReportType;
};

export type ReportsListResDto = Paginated<ReportsListItem>;
