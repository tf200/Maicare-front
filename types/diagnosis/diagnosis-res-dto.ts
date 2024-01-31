import { NewDiagnosisReqDto } from "@/types/diagnosis/new-diagnosis-req-dto";

export type DiagnosisResDto = NewDiagnosisReqDto & {
  id: number;
  date_of_diagnosis: string;
};
