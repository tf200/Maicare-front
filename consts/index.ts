import {
  AllergyOption,
  RateTypeOption,
  SelectionOption,
  SeverityOption,
} from "@/types/selection-option";
import { PaginationParams } from "@/types/pagination-params";
import Draft from "draft-js";
import { CarePlanStatus } from "@/types/care-plan";
import { BadgeType } from "@/types/badge-type";
import {
  CareType,
  ContractStatus,
} from "@/types/contracts/new-contract-req.dto";
import { RateType } from "@/types/rate-type";
import { MaturityLevelType } from "@/types/MatruityLevelType";

export const MIN_CHARACTERS_TO_ENHANCE = 75;

export const DIAGNOSIS_SEVERITY_ARRAY = ["Mild", "Moderate", "Severe"] as const;
export const ALLERGY_TYPE_ARRAY = [
  "Voedsel",
  "Medicijn",
  "Insect",
  "Latex",
  "Schimmel",
  "Huisdier",
  "Pollen",
  "Overig",
] as const;
export const RATE_TYPE_ARRAY = [
  "daily",
  "minute",
  "hourly",
  "weekly",
  "monthly",
] as const;

export const APPOINTMENT_TYPE_ARRAY = ["meeting", "other", "work"] as const;

export const APPOINTMENT_TYPE_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Type", value: "" },
  { label: "Werk", value: "work" },
  { label: "Afspraak", value: "meeting" },
  { label: "Anders", value: "other" },
];

export const INCIDENT_STATUS_OPTIONS: SelectionOption[] = [
  { label: "Selecteer status", value: "" },
  { label: "Reported", value: "Reported" },
  { label: "Under Investigation", value: "Under Investigation" },
  { label: "Resolved", value: "Resolved" },
  { label: "Closed", value: "Closed" },
];

export const DIAGNOSIS_SEVERITY_OPTIONS: SeverityOption[] = [
  { label: "Selecteer Ernst", value: "" },
  { label: "Mild", value: "Mild" },
  { label: "Matig", value: "Moderate" },
  { label: "Ernstig", value: "Severe" },
];

export const SOURCE_OPTIONS = [
  { label: "Selecteer Bron", value: "" },
  { label: "BRP", value: "BRP" },
  { label: "ID", value: "ID" },
  { label: "Paspoort", value: "passport" },
  { label: "Poliskaart", value: "policy_card" },
  { label: "Brief Overheidsinstantie", value: "government_agency_letter" },
];

export const EMERGENCY_RELATION_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Relatie", value: "" },
  { label: "Vader", value: "Vader" },
  { label: "Moeder", value: "Moeder" },
  { label: "Broer/Zus", value: "Broer/Zus" },
  { label: "Ander familielid", value: "Ander familielid" },
  { label: "Niet verwant", value: "Niet verwant" },
];

export const EMERGENCY_DISTANCE_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Afstand", value: "" },
  { label: "Primaire Relatie", value: "Primary Relationship" },
  { label: "Secundaire Relatie", value: "Secondary Relationship" },
];

export const ALLERGY_TYPE_OPTIONS: AllergyOption[] = [
  { label: "Selecteer Allergietype", value: "" },
  { label: "Voedsel", value: "Voedsel" },
  { label: "Medicijn", value: "Medicijn" },
  { label: "Insect", value: "Insect" },
  { label: "Latex", value: "Latex" },
  { label: "Schimmel", value: "Schimmel" },
  { label: "Huisdier", value: "Huisdier" },
  { label: "Pollen", value: "Pollen" },
  { label: "Overig", value: "Overig" },
];

export const CARE_RATE_TYPE_OPTIONS: RateTypeOption[] = [
  { label: "Selecteer Zorgtype", value: "" },
  { label: "Per minuut", value: "minute" },
  { label: "Per uur", value: "hourly" },
  { label: "Dagelijks", value: "daily" },
  { label: "Per week", value: "weekly" },
  { label: "Per maand", value: "monthly" },
];

export const CARE_RATE_OPTIONS_BY_TYPE: Record<CareType, RateTypeOption[]> = {
  ambulante: [
    { label: "Selecteer Tarieftype", value: "" },
    { label: "Per minuut", value: "minute" },
    { label: "Per uur", value: "hourly" },
  ],
  accommodation: [
    { label: "Selecteer Tarieftype", value: "" },
    { label: "Dagelijks", value: "daily" },
    { label: "Per week", value: "weekly" },
    { label: "Per maand", value: "monthly" },
  ],
};

export const CARE_RATE_BY_TYPE: Record<CareType, RateType[]> = {
  ambulante: ["hourly", "minute"],
  accommodation: ["daily", "weekly", "monthly"],
};

export const GENDER_OPTIONS: SelectionOption[] = [
  {
    label: "Man",
    value: "male",
  },
  {
    label: "Vrouw",
    value: "female",
  },
  {
    label: "Niet gespecificeerd",
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
  Outline: "bg-transparent border border-primary text-primary",
};

export const INVOICE_STATUS_TYPES = [
  "outstanding",
  "partially_paid",
  "paid",
  "douabtfull_uncollectible",
  "expired",
  "overpaid",
  "imported",
  "concept",
] as const;

export const INVOICE_STATUS_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Status", value: "" },
  { label: "Openstaand", value: "outstanding" },
  { label: "Gedeeltelijk betaald", value: "partially_paid" },
  { label: "Betaald", value: "paid" },
  { label: "Twijfelachtig", value: "douabtfull_uncollectible" },
  { label: "Verlopen", value: "expired" },
  { label: "Teveel betaald", value: "overpaid" },
  { label: "Geimporteerd", value: "imported" },
  { label: "Concept", value: "concept" },
];

export const PAYMENT_TYPE_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Betaalmethode", value: "" },
  { label: "Contant", value: "cash" },
  { label: "Bank ", value: "bank_transfer" },
  { label: "Creditcard", value: "credit_card" },
];

export const PAYMENT_TYPE_RECORD = {
  cash: "Contant",
  bank_transfer: "Bank",
  credit_card: "Creditcard",
};

export const INVOICE_STATUS_RECORD = {
  outstanding: "Openstaand",
  partially_paid: "Gedeeltelijk betaald",
  paid: "Betaald",
  douabtfull_uncollectible: "Twijfelachtig",
  expired: "Verlopen",
  overpaid: "Teveel betaald",
  imported: "Geimporteerd",
  concept: "Concept",
};

export const INVOICE_STATUS_VARIANT: Record<string, BadgeType> = {
  outstanding: "Warning",
  partially_paid: "Warning",
  paid: "Success",
  douabtfull_uncollectible: "Danger",
  expired: "Dark",
  overpaid: "Success",
  imported: "Info",
  concept: "Outline",
};

export const INVOICE_STATUS_GRAPH = {
  concept: [
    { label: "Selecteer Status", value: "" },
    { label: "Openstaand", value: "outstanding" },
    { label: "Verlopen", value: "expired" },
  ],
  outstanding: [
    { label: "Selecteer Status", value: "" },
    { label: "Gedeeltelijk betaald", value: "partially_paid" },
    { label: "Betaald", value: "paid" },
    { label: "Twijfelachtig", value: "douabtfull_uncollectible" },
    { label: "Verlopen", value: "expired" },
    { label: "Teveel betaald", value: "overpaid" },
  ],
  partially_paid: [
    { label: "Selecteer Status", value: "" },
    { label: "Betaald", value: "paid" },
    { label: "Twijfelachtig", value: "douabtfull_uncollectible" },
    { label: "Verlopen", value: "expired" },
    { label: "Teveel betaald", value: "overpaid" },
  ],
  paid: [],
  expired: [],
  overpaid: [
    { label: "Selecteer Status", value: "" },
    { label: "Betaald", value: "paid" },
  ],
  douabtfull_uncollectible: [
    { label: "Selecteer Status", value: "" },
    { label: "Betaald", value: "paid" },
    { label: "Verlopen", value: "expired" },
    { label: "Teveel betaald", value: "overpaid" },
  ],
};

export * from "./permissions";

export const STATUS_OPTIONS: SelectionOption[] = [
  { value: "On Waiting List", label: "Wachtlijst" },
  { value: "In Care", label: "In Zorg" },
  { value: "Out Of Care", label: "Uit Zorg" },
];

export const STATUS_RECORD = {
  "On Waiting List": "Wachtlijst",
  "In Care": "In Zorg",
  "Out Of Care": "Uit Zorg",
};

export const CARE_PLAN_STATUS_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Status", value: "" },
  {
    label: "Concept",
    value: "draft",
  },
  {
    label: "Geaccepteerd",
    value: "accepted",
  },
  {
    label: "Actief",
    value: "active",
  },
  {
    label: "Opgeschort",
    value: "suspended",
  },
  {
    label: "Voltooid",
    value: "completed",
  },
];

export const CARE_PLAN_STATUS_TRANSLATION = {
  draft: "Concept",
  accepted: "Geaccepteerd",
  active: "Actief",
  suspended: "Opgeschort",
  completed: "Voltooid",
};

export const CARE_PLAN_STATUS_VARIANT: Record<CarePlanStatus, BadgeType> = {
  draft: "Outline",
  accepted: "Info",
  active: "Primary",
  suspended: "Warning",
  completed: "Success",
};

export const MEDICATION_STATUS_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Status", value: "" },
  { label: "Niet genomen", value: "not_taken" },
  { label: "Genomen", value: "taken" },
];

export const CARE_TYPE_ARRAY = ["ambulante", "accommodation"] as const;

export const careTypeDict = {
  ambulante: "Ambulante",
  accommodation: "Accommodatie",
};

export const CARE_TYPE_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Zorgtype", value: "" },
  { label: "Ambulante", value: "ambulante" },
  { label: "Accommodatie", value: "accommodation" },
];

export const AGREEMENT_FILES_TAGS: SelectionOption[] = [
  { value: "", label: "Selecteer Overeenkomst..." },
  { value: "client_agreement", label: "Client Overeenkomst" },
  { value: "framework_agreement", label: "Raamovereenkomst" },
  { value: "decision", label: "Besluit" },
  { value: "other", label: "Overige" },
];

export const AGREEMENT_FILES_TAGS_RECORD = {
  client_agreement: "Cliënt Overeenkomst",
  framework_agreement: "Raamovereenkomst",
  decision: "Besluit",
  other: "Overige",
};

export const CONTRACT_STATUS_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Status", value: "" },
  { label: "Concept", value: "draft" },
  { label: "Goedgekeurd", value: "approved" },
  { label: "Beëindigd", value: "terminated" },
];

export const CONTRACT_STATUS_VARIANT_DICT: Record<ContractStatus, BadgeType> = {
  draft: "Outline",
  approved: "Success",
  terminated: "Dark",
};

export const CONTRACT_STATUS_TRANSLATION_DICT: Record<ContractStatus, string> =
  {
    draft: "Concept",
    approved: "Goedgekeurd",
    terminated: "Beëindigd",
  };

export const FINANCING_LAW_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Financieringswet", value: "" },
  { label: "Wmo 2015", value: "WMO" },
  { label: "Zorgverzekeringswet (Zvw)", value: "ZVW" },
  { label: "Wet langdurige zorg (WlZ)", value: "WLZ" },
  { label: "Jeugdwet (JW)", value: "JW" },
  { label: "Wet publieke gezondheidszorg (Wpg)", value: "WPG" },
];

export const FINANCING_LAW_RECORD = {
  WMO: "Wmo 2015",
  ZVW: "Zorgverzekeringswet (Zvw)",
  WLZ: "Wet langdurige zorg (WlZ)",
  JW: "Jeugdwet (JW)",
  WPG: "Wet publieke gezondheidszorg (Wpg)",
};

export const FINANCING_OPTION_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Financieringsoptie", value: "" },
  { label: "ZIN", value: "ZIN" },
  { label: "PGB", value: "PGB" },
];

export const HOURS_TERM_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Uren Term", value: "" },
  { label: "Per Week", value: "week" },
  { label: "Gehele Periode", value: "all_period" },
];

export const EMPLOYEE_ASSIGNMENT_TYPES = [
  "care_nurse",
  "first_responsible",
  "mentor",
  "personal_coach",
  "care_coordinator",
  "outpatient_counselor",
  "co-mentor",
] as const;

export const EMPLOYEE_ASSIGNMENT_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Relatie", value: "" },
  { label: "Verzorging / Verpleging", value: "care_nurse" },
  { label: "Eerst Verantwoordelijke", value: "first_responsible" },
  { label: "Mentor", value: "mentor" },
  { label: "Persoonlijke Coach", value: "personal_coach" },
  { label: "Zorgcoördinator", value: "care_coordinator" },
  { label: "Ambulant Begeleider", value: "outpatient_counselor" },
  { label: "Co-Mentor", value: "co-mentor" },
];

export const EMPLOYEE_ASSIGNMENT_RECORD = {
  care_nurse: "Verzorging / Verpleging",
  first_responsible: "Eerst Verantwoordelijke",
  mentor: "Mentor",
  personal_coach: "Persoonlijke Coach",
  care_coordinator: "Zorgcoördinator",
  outpatient_counselor: "Ambulant Begeleider",
  "co-mentor": "Co-Mentor",
};

export const MaturityLevelTypes = [
  "acute_problems",
  "not_self_reliant",
  "limited_self_reliant",
  "sufficient_self_reliant",
  "fully_self_reliant",
] as const;

export const MLevelTrans: { [key in MaturityLevelType]: string } = {
  acute_problems: "Acute problematiek",
  not_self_reliant: "Niet zelfredzaam",
  limited_self_reliant: "Beperkt zelfredzaam",
  sufficient_self_reliant: "Voldoende zelfredzaam",
  fully_self_reliant: "Volledig zelfredzaam",
};

export const MLevels = [
  "Acute problematiek", // acute problems
  "Niet zelfredzaam", // not self-reliant
  "Beperkt zelfredzaam", // limited self-reliant
  "Voldoende zelfredzaam", // sufficient self-reliant
  "Volledig zelfredzaam", // fully self-reliant
];
