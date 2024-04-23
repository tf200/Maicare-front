import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";

export type ContractResDto = Omit<
  NewContractReqDto,
  "attachment_ids" | "type_id"
> & {
  id: number;
  type: number;
  attachments: AttachmentItem[];
};
