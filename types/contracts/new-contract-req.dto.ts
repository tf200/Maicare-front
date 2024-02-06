import { ContractFormType } from "@/types/contracts/contract-form-type";

export type NewContractReqDto = ContractFormType & {
  client: number;
};
