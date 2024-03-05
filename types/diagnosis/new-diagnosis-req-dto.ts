import { DiagnosisSeverity } from "@/types/dagnosis-servity";

export type NewDiagnosisReqDto = {
  id: number,
  client: number;
  title: string;
  diagnosis_code: string;
  severity: DiagnosisSeverity;
  status: string;
  diagnosing_clinician: string;
  notes: string;
  description: string;
};
