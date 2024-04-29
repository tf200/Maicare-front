export type GoalsFormType = {
  title: string;
  desc: string;
  domain_id: string;
};

export type NewGoalsReqDto = {
  title: string;
  desc: string;
  domain_id: number;
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

export type ObjectiveFormType = {
  title: string;
  desc: string;
  rating: number;
};

export type NewObjectiveReqDto = {
  title: string;
  desc: string;
  rating: number;
};

export type UpdateObjectiveReqDto = Partial<NewObjectiveReqDto>;

export type UpdateGoalReqDto = Partial<Pick<NewGoalsReqDto, "desc" | "title">>;

export type RatingHistoryItem = {
  rating: number;
  date: string;
};

export type RatingHistory = RatingHistoryItem[];
