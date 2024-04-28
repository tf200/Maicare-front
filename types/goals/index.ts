export type GoalsFormType = {
  goal_name: string;
  goal_details: string;
  domain_id: string;
};

export type ObjectiveItem = {
  id: number;
  goal_id: number;
  client_id: number;
  title: string;
  desc: string;
  rating: number;
  updated: string;
  created: string;
};

export type GoalsListItem = {
  id: number;
  domain_id: number;
  client_id: number;
  objectives: ObjectiveItem[];
  main_goal_rating: number;
  title: string;
  desc: string;
  updated: string;
  created: string;
};

export type GoalsListResDto = Paginated<GoalsListItem>;
