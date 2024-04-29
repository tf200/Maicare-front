import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";

export type PatchContractReqDto = NewContractReqDto;

export type AddWorkingHoursReqDto = {
  minutes: number;
  datetime: string;
  notes: string;
};

export type WorkingHoursResDto = AddWorkingHoursReqDto & {
  id: number;
  contract_id: number;
};

export type WorkingHoursListResDto = Paginated<WorkingHoursResDto>;

export type WorkingHoursFormType = {
  hours: string;
  minutes: string;
  datetime: string;
  notes: string;
};

export type ContractFilterFormType = {
  sender: number;
  client: number;
  care_type: string;
  status: string;
};

export type ContractSearchParams = Partial<ContractFilterFormType>;
