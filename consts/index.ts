import {
  AllergyOption,
  SelectionOption,
  SeverityOption,
} from "@/types/selection-option";

export const DIAGNOSIS_SEVERITY_ARRAY = ["Mild", "Moderate", "Severe"] as const;
export const ALLERGY_TYPE_ARRAY = [
  "Food",
  "Drug",
  "Insect",
  "Latex",
  "Mold",
  "Pet",
  "Pollen",
  "Other",
] as const;

export const DIAGNOSIS_SEVERITY_OPTIONS: SeverityOption[] = [
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

export const ALLERGY_TYPE_OPTIONS: AllergyOption[] = [
  { label: "Select Allergy Type", value: "" },
  { label: "Food", value: "Food" },
  { label: "Drug", value: "Drug" },
  { label: "Insect", value: "Insect" },
  { label: "Latex", value: "Latex" },
  { label: "Mold", value: "Mold" },
  { label: "Pet", value: "Pet" },
  { label: "Pollen", value: "Pollen" },
  { label: "Other", value: "Other" },
];

// TODO: this is assumed to be 10, it should come from the backend
export const PAGE_SIZE = 10;
