import {
  AllergyOption,
  RateTypeOption,
  SelectionOption,
  SeverityOption,
} from "@/types/selection-option";
import { PaginationParams } from "@/types/pagination-params";

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
export const RATE_TYPE_ARRAY = [
  "rate_per_day",
  "rate_per_minute",
  "rate_per_hour",
] as const;

export const DIAGNOSIS_SEVERITY_OPTIONS: SeverityOption[] = [
  { label: "Select Severity", value: "" },
  { label: "Mild", value: "Mild" },
  { label: "Moderate", value: "Moderate" },
  { label: "Severe", value: "Severe" },
];

export const SOURCE_OPTIONS = [
  { label: "Select source", value: "" },
  { label: "BRP", value: "BRP" },
];

export const EMERGENCY_RELATION_OPTIONS: SelectionOption[] = [
  { label: "Select Relation", value: "" },
  { label: "Father", value: "Father" },
  { label: "Mother", value: "Mother" },
  { label: "Sibling", value: "Sibling" },
  { label: "Other family member", value: "Other family member" },
  { label: "Unrelated", value: "Unrelated" },
];

export const EMERGENCY_DISTANCE_OPTIONS: SelectionOption[] = [
  { label: "Select Distance", value: "" },
  { label: "Primary Relationship", value: "Primary Relationship" },
  { label: "Secondary Relationship", value: "Secondary Relationship" },
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

export const CARE_TYPE_OPTIONS: RateTypeOption[] = [
  { label: "Select Care Type", value: "" },
  { label: "Hourly", value: "rate_per_hour" },
  { label: "Daily", value: "rate_per_day" },
  { label: "Minute", value: "rate_per_minute" },
];

export const GENDER_OPTIONS: SelectionOption[] = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Not specified",
    value: "not_specified",
  },
];

// TODO: this is assumed to be 10, it should come from the backend
export const PAGE_SIZE = 10;

export const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
  page: 1,
  page_size: PAGE_SIZE,
};

export const BUTTON_CLASS_NAMES = {
  Primary: "bg-primary text-white",
  Secondary: "bg-secondary text-white",
  Danger: "bg-danger text-white",
  Success: "bg-success text-white",
};
