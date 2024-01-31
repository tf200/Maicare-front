import { SelectionOption } from "@/types/selection-option";

export const DIAGNOSIS_SEVERITY_ARRAY = ["Mild", "Moderate", "Severe"] as const;

export const DIAGNOSIS_SEVERITY_OPTIONS: SelectionOption[] = [
  { label: "Select Severity", value: "" },
  { label: "Mild", value: "Mild" },
  { label: "Moderate", value: "Moderate" },
  { label: "Severe", value: "Severe" },
];

export const EMERGENCY_RELATION_OPTIONS: SelectionOption[] = [
  { label: "Select Relation", value: "" },
  { label: "Relation 1", value: "Relation 1" },
  { label: "Relation 2", value: "Relation 2" },
  { label: "Relation 3", value: "Relation 3" },
];

// TODO: this is assumed to be 10, it should come from the backend
export const PAGE_SIZE = 10;
