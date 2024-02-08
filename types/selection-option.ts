import { AllergyType } from "@/types/allergyType";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import { RateType } from "@/types/rate-type";
import { ReactNode } from "react";

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

export type RateTypeOption = SelectionOption & {
  value: RateType | "";
};

export type ButtonOption = {
  label: ReactNode;
  value: string;
};

export type LinkOption = {
  label: ReactNode;
  href: string;
  getIsActive?: (pathname: string, href: string) => boolean;
};
