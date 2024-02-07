export type ReportsListItem = {
  id: number;
  date: string;
  report_text: string;
  client: number;
  title: string;
  author: string;
};

export type ReportsListResDto = Paginated<ReportsListItem>;
