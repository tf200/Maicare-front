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
  created_by_id: number;
  reviewed_by_id: number;
  is_approved: boolean;
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
  id: number;
  rating: number;
  date: string;
  week: number;
  title: string;
  content: string;
};

export type RatingHistory = RatingHistoryItem[];

export type WeeklyRatingHistoryItem = {
  id: number;
  rating: number;
  week: number;
  content: string;
};

export type WeeklyRatingHistory = WeeklyRatingHistoryItem[];

export type SetDomainLevelReqDto = {
  level: number;
  domain_id: number;
};

export type ObjectiveReportFormType = {
  week: string;
  content: string;
  rating: number;
};

export type ObjectiveReportReqDto = {
  week: number;
  content: string;
  rating: number;
};

export type ObjectiveReportResDto = {
  id: number;
  title: string;
  content: string;
  rating: number;
  week: number;
};

export type UpdateObjectiveReportReqDto = Partial<ObjectiveReportReqDto>;
