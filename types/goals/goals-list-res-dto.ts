export type GoalsListItem = {
  id: number;
  client: number;
  goal_name: string;
  goal_details: string;
  rating: string;
  report: string;
  administered_by: number;
  created_at: string
};

export type GoalsListResDto = Paginated<GoalsListItem>;
