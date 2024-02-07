export type NewReportsReqDto = {
  id?: number;
  title: string;
  report_text: string;
  date?: string;
  client?: number;
  author?: string;
};
