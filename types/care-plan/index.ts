export const CARE_PLAN_STATUS = [
  "draft",
  "accepted",
  "active",
  "suspended",
  "completed",
] as const;

export type CarePlanStatus = (typeof CARE_PLAN_STATUS)[number];

export type CarePlanFormType = {
  client_id: number;
  description: string;
  start_date: string;
  end_date: string;
  status: CarePlanStatus;
  temporary_file_ids: string[];
};

export type CarePlanResDto = Omit<CarePlanFormType, "temporary_file_ids"> & {
  id: number;
  attachments: string[];
};

export type CreateCarePlanReqDto = CarePlanFormType;

export type UpdateCarePlanReqDto = Partial<
  CarePlanFormType & {
    attachment_ids_to_delete: string[];
  }
>;

export type CarePlanListResDto = Omit<CarePlanResDto, "attachments">[];
