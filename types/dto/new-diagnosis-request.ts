import { DiagnosisSeverity } from "@/types/dagnosis-servity";

export type NewDiagnosisRequest = {
  client: number;
  title: string;
  diagnosis_code: string;
  severity: DiagnosisSeverity;
  status: string;
  diagnosing_clinician: string;
  notes: string;
  description: string;
};
