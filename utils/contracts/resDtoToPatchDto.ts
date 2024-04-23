import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { omit } from "@/utils/omit";
import { PatchContractReqDto } from "@/types/contracts";

export function resDtoToPatchDto(resDto: ContractResDto): PatchContractReqDto {
  return {
    ...omit(resDto, ["attachments", "type"]),
    type_id: resDto.type,
    attachment_ids: resDto.attachments.map((a) => a.id),
  };
}
