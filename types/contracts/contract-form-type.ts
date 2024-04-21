import { RateType } from "@/types/rate-type";

export const CONTRACT_DURATION_OPTIONS = ["3", "6", "9", "12"] as const; // IN MONTHS
export type ContractDurationType = (typeof CONTRACT_DURATION_OPTIONS)[number];

export const COMPANY_CONTRACT_OPTIONS = ["1"] as const; // per year
export type CompanyContractType = (typeof COMPANY_CONTRACT_OPTIONS)[number];

export type ContractFormType = {
  start_date: string;
  end_date: string;
  care_type: string;
  rate_type: RateType | "";
  rate_value: string;
  company_contract_period: CompanyContractType | "";
  added_attachments: string[];
  removed_attachments?: string[];
  reminder_period: string;
  tax: string;
  contract_name: string;
  type: string;
};
