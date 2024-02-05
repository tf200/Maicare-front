import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import { AllergyType } from "@/types/allergyType";

export type AllergiesResDto = {
  id: number;
  allergy_type: AllergyType;
  severity: DiagnosisSeverity;
  reaction: string;
  notes: string;
  client: number;
};
