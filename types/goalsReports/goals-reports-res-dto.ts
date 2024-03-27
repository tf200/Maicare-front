export type GoalsReportsResDto = {
  id: number;
  created_at: string;
  goal_name: string;
  goal_details: string;
  client: number;
  administered_by: number;
  goals_report: {
    id: number;
    goal: number;
    title: string;
    report_text: string;
    rating: number;
    created_at: string;
  }[];
};
