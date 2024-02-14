import { NewBgInfoReqDto } from "./new-bg-info-req.dto";

export type BgInfoResDto<FormType> = NewBgInfoReqDto<FormType> & {
  id: number;
};
