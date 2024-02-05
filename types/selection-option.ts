import { AllergyType } from "@/types/allergyType";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";

export type SelectionOption = {
  label: string;
  value: string;
};

export type AllergyOption = SelectionOption & {
  value: AllergyType | "";
};

export type SeverityOption = SelectionOption & {
  value: DiagnosisSeverity | "";
};
