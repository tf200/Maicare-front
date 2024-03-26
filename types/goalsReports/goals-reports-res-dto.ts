export type GoalsReportsResDto = {
  goals_report: {
    id: number;
    goal: number;
    title: string;
    report_text: string;
    rating: number;
    created_at: string;
  }[];
};
