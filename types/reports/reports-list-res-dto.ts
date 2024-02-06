export type ReportsListItem = {
  id: number;
  date: string;
  report_text: string;
  client: number;
};

export type ReportsListResDto = Paginated<ReportsListItem>;
