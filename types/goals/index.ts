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
  created_by_name: string;
  reviewed_by_name: string;
  created_by: number;
  reviewed_by: number;
};

export type GoalsListResDto = Paginated<GoalsListItem>;

export type ObjectiveFormType = {
  title: string;
  desc: string;
};

export type NewObjectiveReqDto = {
  title: string;
  desc: string;
};

export type UpdateObjectiveReqDto = Partial<NewObjectiveReqDto>;

export type UpdateGoalReqDto = Partial<NewGoalsReqDto>;

export type RatingHistoryItem = {
  rating: number;
  date: string;
  title: string;
  desc: string;
};

export type RatingHistory = RatingHistoryItem[];

export type SetDomainLevelReqDto = {
  level: number;
  domain_id: number;
};

export type ObjectiveReportFormType = {
  date: string;
  content: string;
  rating: number;
};

export type ObjectiveReportReqDto = {
  date: string;
  content: string;
  rating: number;
};

export type ObjectiveReportResDto = {
  id: number;
  title: string;
  desc: string;
  rating: number;
};

export type UpdateObjectiveReportReqDto = Partial<ObjectiveReportReqDto>;
