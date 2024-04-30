import { RateType } from "@/types/rate-type";

export const CONTRACT_DURATION_OPTIONS = ["3", "6", "9", "12"] as const; // IN MONTHS
export type ContractDurationType = (typeof CONTRACT_DURATION_OPTIONS)[number];

export const COMPANY_CONTRACT_OPTIONS = ["1"] as const; // per year
export type CompanyContractType = (typeof COMPANY_CONTRACT_OPTIONS)[number];

export const FINANCING_LAW_TYPES = ["WMO", "ZVW", "WLZ", "JW", "WPG"] as const;
export type FinancingLawType = (typeof FINANCING_LAW_TYPES)[number];

export const FINANCING_OPTION_TYPES = ["ZIN", "PGB"] as const;
export type FinancingOptionType = (typeof FINANCING_OPTION_TYPES)[number];

export const HOURS_TERM_TYPES = ["week", "all_period"] as const;
export type HoursTermType = (typeof HOURS_TERM_TYPES)[number];

export type ContractFormType = {
  start_date: string;
  end_date: string;
  care_type: string;
  rate_type: RateType | "";
  rate_value: string;
  added_attachments: string[];
  removed_attachments?: string[];
  reminder_period: string;
  tax: string;
  contract_name: string;
  type: string;
  is_default_tax: boolean;
  status: string;
  financing_act: FinancingLawType | "";
  financing_option: FinancingOptionType | "";
  hours_type: HoursTermType | "";
  hours: string;
};
