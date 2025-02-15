import { AttachmentItem } from "@/types/appointments/appointment-res-dto";

export type ExpenseFormType = {
  amount: string;
  location: string;
  tax: string;
  created: string;
  desc: string;
  added_attachments: string[];
  removed_attachments: string[];
};

export type ExpenseReqDto = {
  amount: number;
  location_id: number;
  tax: number;
  created: string;
  desc: string;
  attachment_ids: string[];
};

export type PatchExpenseReqDto = Partial<ExpenseReqDto>;

export type ExpenseResDto = {
  id: number;
  location: number;
  amount: number;
  tax: number;
  created: string;
  desc: string;
  attachments: AttachmentItem[];
};

export type ExpenseListResDto = Paginated<ExpenseResDto>;

export type ExpensesSearchParams = {
  location?: number;
};
