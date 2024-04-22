import { ContractResDto } from "@/types/contracts/contract-res.dto";
import {
  CompanyContractType,
  ContractDurationType,
  ContractFormType,
} from "@/types/contracts/contract-form-type";

export function mapToForm(data: ContractResDto): ContractFormType {
  return {
    start_date: data.start_date,
    end_date: data.end_date,
    care_type: data.care_type,
    rate_type: data.price_frequency,
    rate_value: data.price + "",
    company_contract_period: "1",
    added_attachments: data.attachments.map((attachment) => attachment.id + ""),
    reminder_period: data.reminder_period + "",
    tax: data.tax + "",
    contract_name: data.care_name,
    type: data.type_id + "",
  };
}
