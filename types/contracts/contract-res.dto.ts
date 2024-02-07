import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";

export type ContractResDto = NewContractReqDto & {
  id: number;
};
