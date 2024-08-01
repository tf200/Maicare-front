import { NewAllergyReqDto } from "@/types/allergies/new-allergy-req-dto";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import { AllergyType } from "@/types/allergyType";

export type AllergyFormType = Omit<NewAllergyReqDto, "client" | "severity" | "allergy_type"> & {
  severity: DiagnosisSeverity | "";
  allergy_type: AllergyType | "";
};
