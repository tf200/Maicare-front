export type AutomaticReportsResDto = Paginated<AutomaticReportItem>;

export type AutomaticReportItem = {
  id: number;
  report_type: string;
  title: string;
  content: string;
  user: number;
  user_type: string;
  start_date: string;
  end_date: string;
  updated: string;
  created: string;
};

export type AutomaticReportsReqDto = {
  client_id: number;
  from: string;
  to: string;
};

export type AutomaticReportFormType = {
  from: string;
  to: string;
};
