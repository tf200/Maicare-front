import { ContractResDto } from "@/types/contracts/contract-res.dto";
import {
  CompanyContractType,
  ContractDurationType,
  ContractFormType,
} from "@/types/contracts/contract-form-type";

export function mapToForm(data: ContractResDto): ContractFormType {
  return {
    start_date: data.start_date,
    care_type: data.care_type,
    rate_type: data.price_frequency,
    rate_value: data.price + "",
    company_contract_period: (data.duration_sender + "") as CompanyContractType,
    client_contract_period: (data.duration_client + "") as ContractDurationType,
    temporary_file_ids: data.temporary_file_ids,
  };
}
