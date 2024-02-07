import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import { AllergyType } from "@/types/allergyType";
import { NewAllergyReqDto } from "@/types/allergies/new-allergy-req-dto";

export type AllergiesResDto = {
  id: number;
} & NewAllergyReqDto;
