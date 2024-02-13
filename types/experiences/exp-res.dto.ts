import { NewExpReqDto } from "@/types/experiences/new-exp-req.dto";

export type ExpResDto = NewExpReqDto & {
  id: number;
};
