import { ContractResDto } from "@/types/contracts/contract-res.dto";
import {
  CompanyContractType,
  ContractDurationType,
  ContractFormType,
} from "@/types/contracts/contract-form-type";
import dayjs from "dayjs";

export function mapToForm(data: ContractResDto): ContractFormType {
  return {
    start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
    end_date: dayjs(data.end_date).format("YYYY-MM-DD"),
    care_type: data.care_type,
    rate_type: data.price_frequency,
    rate_value: data.price + "",
    company_contract_period: "1",
    added_attachments: data.attachments.map((attachment) => attachment.id + ""),
    reminder_period: data.reminder_period + "",
    contract_name: data.care_name,
    is_default_tax: data.tax === -1,
    tax: data.tax === -1 ? "" : data.tax + "",
    status: data.status,
    type: data.type + "",
  };
}
