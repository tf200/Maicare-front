import {
  ContractFormType,
  FinancingLawType,
  FinancingOptionType,
} from "@/types/contracts/contract-form-type";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import {
  CareType,
  ContractStatus,
  NewContractReqDto,
} from "@/types/contracts/new-contract-req.dto";
import { RateType } from "@/types/rate-type";

export function formToDto(
  form: ContractFormType,
  client: number,
  contact: number,
  contractToEdit?: ContractResDto
): NewContractReqDto {
  return {
    client_id: client,
    sender_id: contact,
    start_date: form.start_date,
    end_date: form.end_date,
    care_type: form.care_type as CareType,
    price_frequency: form.rate_type as RateType,
    price: parseFloat(form.rate_value),
    attachment_ids:
      contractToEdit?.attachments
        ?.map((a) => a.id)
        .filter((a) => !form.removed_attachments.includes(a))
        .concat(form.added_attachments) ?? form.added_attachments,
    reminder_period: +form.reminder_period,
    tax: form.is_default_tax ? -1 : +form.tax,
    care_name: form.contract_name,
    type_id: +form.type,
    status: form.status as ContractStatus,
    financing_act: form.financing_act as FinancingLawType,
    financing_option: form.financing_option as FinancingOptionType,
    hours_type: form.hours_type,
    hours: parseFloat(form.hours),
  };
}
