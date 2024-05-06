import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";
import { AttachmentItem } from "@/types/appointments/appointment-res-dto";
import { DepartureEntries } from "@/types/departure_entries";

export type ContractResDto = Omit<
  NewContractReqDto,
  "attachment_ids" | "type_id"
> & {
  id: number;
  type: number;
  attachments: AttachmentItem[];
} & Partial<DepartureEntries>;
