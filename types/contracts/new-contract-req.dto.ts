import { RateType } from "@/types/rate-type";
import {
  FinancingLawType,
  FinancingOptionType,
} from "@/types/contracts/contract-form-type";

export type CareType = "ambulante" | "accommodation";

export type ContractStatus = "draft" | "approved" | "terminated";

export type NewContractReqDto = {
  client_id: number;
  sender_id: number;
  type_id: number;
  attachment_ids: string[];
  price: number;
  price_frequency: RateType;
  care_type: CareType;
  start_date: string;
  end_date: string;
  reminder_period: number; // in days
  tax: number;
  care_name: string;
  status: ContractStatus;
  financing_act: FinancingLawType;
  financing_option: FinancingOptionType;
  hours_type: string;
  hours: number;
};
