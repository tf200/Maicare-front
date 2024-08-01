import { EditorState } from "draft-js";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";

export const CARE_PLAN_STATUS = ["draft", "accepted", "active", "suspended", "completed"] as const;

export type CarePlanStatus = (typeof CARE_PLAN_STATUS)[number];

export type CarePlanFormType = {
  description: EditorState;
  domain_ids: number[];
  start_date: string;
  end_date: string;
  temporary_file_ids: string[];
  attachment_ids_to_delete?: string[];
};

export type CarePlanResDto = Omit<
  CarePlanFormType,
  "temporary_file_ids" | "description" | "attachment_ids_to_delete"
> & {
  id: number;
  client: number;
  attachments: AttachmentItem[];
  description: string;
  status: CarePlanStatus;
};

export type CreateCarePlanReqDto = Omit<
  CarePlanFormType,
  "description" | "attachment_ids_to_delete"
> & {
  description: string;
  client: number;
  status: CarePlanStatus;
};

export type UpdateCarePlanReqDto = Partial<
  Omit<CarePlanResDto, "id"> & {
    attachment_ids_to_delete: string[];
    temporary_file_ids: string[];
  }
>;

export type CarePlanListItem = Omit<CarePlanResDto, "attachments">;
export type CarePlanListResDto = Paginated<CarePlanListItem>;
