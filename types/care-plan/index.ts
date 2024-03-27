import { EditorState } from "draft-js";

export const CARE_PLAN_STATUS = [
  "draft",
  "accepted",
  "active",
  "suspended",
  "completed",
] as const;

export type CarePlanStatus = (typeof CARE_PLAN_STATUS)[number];

export type CarePlanFormType = {
  client: number;
  description: EditorState;
  start_date: string;
  end_date: string;
  temporary_file_ids: string[];
};

export type CarePlanResDto = Omit<
  CarePlanFormType,
  "temporary_file_ids" | "description"
> & {
  id: number;
  attachments: string[];
  description: string;
  status: CarePlanStatus;
};

export type CreateCarePlanReqDto = Omit<CarePlanFormType, "description"> & {
  description: string;
  client: number;
  status: CarePlanStatus;
};

export type UpdateCarePlanReqDto = Partial<
  Omit<CarePlanResDto, "id"> & {
    attachment_ids_to_delete: string[];
  }
>;

export type CarePlanListItem = Omit<CarePlanResDto, "attachments">;
export type CarePlanListResDto = Paginated<CarePlanListItem>;
