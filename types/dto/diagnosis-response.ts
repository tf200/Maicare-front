import { NewDiagnosisRequest } from "@/types/dto/new-diagnosis-request";

export type DiagnosisResponse = NewDiagnosisRequest & {
  id: number;
  date_of_diagnosis: string;
};
