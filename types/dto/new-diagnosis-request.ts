import { DiagnosisSeverity } from "@/types/dagnosis-servity";

export type NewDiagnosisRequest = {
  client: string;
  title: string;
  diagnosis_code: string;
  date_of_diagnosis: Date;
  severity: DiagnosisSeverity;
  status: string;
  diagnosing_clinician: string;
  notes: string;
  condition: string;
};
