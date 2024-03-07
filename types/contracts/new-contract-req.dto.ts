import { RateType } from "@/types/rate-type";

export type NewContractReqDto = {
  client: number;
  sender: number;
  start_date: string;
  end_date: string;
  care_type: string;
  rate_type: RateType;
  rate_value: number;
  temporary_file_ids: string[];
};
