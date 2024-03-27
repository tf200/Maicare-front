import { RateType } from "@/types/rate-type";

export const CONTRACT_DURATION_OPTIONS = ["3", "6", "9", "12"] as const; // IN MONTHS
export type ContractDurationType = (typeof CONTRACT_DURATION_OPTIONS)[number];

export const COMPANY_CONTRACT_OPTIONS = ["1"] as const; // per year
export type CompanyContractType = (typeof COMPANY_CONTRACT_OPTIONS)[number];

export type ContractFormType = {
  start_date: string;
  care_type: string;
  rate_type: RateType | "";
  rate_value: string;
  company_contract_period: CompanyContractType | "";
  client_contract_period: ContractDurationType | "";
  temporary_file_ids: string[];
  attachment_ids_to_delete?: string[];
};
