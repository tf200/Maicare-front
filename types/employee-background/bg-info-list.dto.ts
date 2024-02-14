import { BgInfoResDto } from "./bg-info-res.dto";

export type BgInfoListDto<FormType> = Paginated<BgInfoResDto<FormType>>;
