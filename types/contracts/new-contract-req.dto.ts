import { RateType } from "@/types/rate-type";

export type CareType = "ambulante" | "accommodation";

export type NewContractReqDto = {
  client_id: number;
  sender_id: number;
  type_id: number;
  attachments: string[];
  price: number;
  price_frequency: RateType;
  care_type: CareType;
  start_date: string;
  end_date: string;
  reminder_period: number; // in days
  tax: number;
  care_name: string;
};
