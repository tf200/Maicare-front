import { AllergyType } from "@/types/allergyType";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";

export type NewAllergyReqDto = {
  allergy_type: AllergyType;
  severity: DiagnosisSeverity;
  reaction: string;
  notes: string;
  client: number;
};
