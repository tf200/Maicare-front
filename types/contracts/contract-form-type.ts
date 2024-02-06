import { RateType } from "@/types/rate-type";

export type ContractFormType = {
  start_date: string;
  end_date: string;
  care_type: string;
  rateType: RateType | "";
  rate: string;
};
