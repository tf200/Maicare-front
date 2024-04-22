import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";

export type ContractResDto = Omit<NewContractReqDto, "attachments"> & {
  id: number;
  attachments: AttachmentItem[];
};
