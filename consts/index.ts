import { SelectionOption } from "@/types/selection-option";

export const DIAGNOSIS_SEVERITY_ARRAY = ["Mild", "Moderate", "Severe"] as const;

export const DIAGNOSIS_SEVERITY_OPTIONS: SelectionOption[] = [
  { label: "Select Severity", value: "" },
  { label: "Mild", value: "Mild" },
  { label: "Moderate", value: "Moderate" },
  { label: "Severe", value: "Severe" },
];
