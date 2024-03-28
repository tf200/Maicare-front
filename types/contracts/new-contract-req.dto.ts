import { RateType } from "@/types/rate-type";

export type NewContractReqDto = {
  client: number;
  sender: number;
  start_date: string;
  duration_client: number;
  duration_sender: number;
  care_type: string;
  rate_type: RateType;
  rate_value: number;
  temporary_file_ids: string[];
  attachment_ids_to_delete?: string[];
};
