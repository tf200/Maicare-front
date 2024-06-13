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
import { CareType, ContractStatus } from "@/types/contracts/new-contract-req.dto";
import { RateType } from "@/types/rate-type";
import { MaturityLevelType } from "@/types/MatruityLevelType";
import { PERMISSIONS_EDIT, SETTINGS_VIEW } from "@/consts/permissions";

export const MIN_CHARACTERS_TO_ENHANCE = 75;

export const EMPTY_STRING = "";
export const FALSE = false;

export const INCIDENT_TYPE = "incident_report";
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
export const RATE_TYPE_ARRAY = ["daily", "minute", "hourly", "weekly", "monthly"] as const;

export const APPOINTMENT_TYPE_ARRAY = ["meeting", "other", "work", "home_care"] as const;

export const CONSENT_DECLARATION_CONTENT = {
  description_of_proposed_assistence:
    "Hier wordt gedetailleerd beschreven welke hulpverlening, behandeling, of actie wordt voorgesteld, inclusief de aard, doelen, en duur van de interventie.",
  legal_representative:
    "Hierbij geef ik, [Naam ouder/voogd], als wettelijk vertegenwoordiger van [Naam jeugdige], toestemming voor de voorgestelde hulpverlening, behandeling, of actie zoals hierboven beschreven. Ik heb uitleg gekregen over de aard en doelen van de hulpverlening, de mogelijke risico's en voordelen, en alternatieve opties. Ik begrijp wat de voorgestelde hulpverlening inhoudt en ga akkoord met de uitvoering ervan. Ik begrijp dat ik op elk moment mijn instemming kan intrekken of vragen kan stellen over de voortgang van de hulpverlening. Ik ben geïnformeerd over mijn recht om een kopie van deze instemmingsverklaring te ontvangen en te bewaren.",
};

export const APPOINTMENT_TYPE_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Type", value: "" },
  { label: "Werk", value: "work" },
  { label: "Afspraak", value: "meeting" },
  { label: "Thuiszorg", value: "home_care" },
  { label: "Anders", value: "other" },
];

export const CONSULTATION_NEEDED_OPTIONS = [
  { label: "Selecteer Type", value: "" },
  { label: "Nee", value: "no" },
  { label: "Nog niet duidelijk", value: "not_clear" },
  { label: "Ziekenhuisopname", value: "hospitalization" },
  { label: "Consult huisarts", value: "consult_gp" },
];

export const PSYCHOLOGICAL_DAMAGE_OPTIONS = [
  { label: "Selecteer Type", value: "" },
  { label: "Geen", value: "no" },
  { label: "Nog niet merkbaar", value: "not_noticeable_yet" },
  { label: "Sufheid", value: "drowsiness" },
  { label: "Onrust", value: "unrest" },
  { label: "anders, nl.", value: "other" },
];

export const INJURY_OPTIONS = [
  { label: "Selecteer Type", value: "" },
  { label: "Geen letsel", value: "no_injuries" },
  { label: "Nog niet merkbaar", value: "not_noticeable_yet" },
  { label: "Blauwe plek / zwelling", value: "bruising_swelling" },
  { label: "Huidletsel", value: "skin_injury" },
  { label: "Botbreuk", value: "broken_bones" },
  { label: "Benauwdheid", value: "shortness_of_breath" },
  { label: "Overleden", value: "death" },
  { label: "anders, nl.", value: "other" },
];

export const DELETE_INVOLVEMENT_OPTIONS: SelectionOption[] = [
  { label: "Selecter status", value: "" },
  { label: "Directly involved", value: "Reported" },
  { label: "Witness", value: "Under Investigation" },
  { label: "Found afterwards", value: "Resolved" },
  { label: "Alarmed", value: "Closed" },
];

export const SEVERITY_OF_INCIDENT_OPTIONS = [
  { label: "Selecter status", value: "" },
  {
    label: "Bijna incident: Geen gevolgen voor de cliënt / medewerker",
    value: "near_incident",
  },
  {
    label: "Minder ernstig: beinvloedt de cliënt / medewerker en/of vervolgprocessen",
    value: "less_serious",
  },
  {
    label:
      "Ernstig: tijdelijke gevolgen voor de cliënt / medewerker Zeer ernstig: blijvende gevolgen voor de client / medewerker",
    value: "serious",
  },
  {
    label: "Fataal: Overlijden van de client / medewerker als gevolg van het incident",
    value: "fatal",
  },
];

export const RISK_OF_RECURRENCE_OPTIONS = [
  { label: "Selecter status", value: "" },
  {
    label:
      "Zeer laag: het zal niet vaker dan 1 x per 5 jaar gebeuren Laag: het zal mogelijk binnen enkele maanden weer gebeuren",
    value: "very_low",
  },
  {
    label: "Middel: het zal mogelijk binnen enkele weken weer gebeuren",
    value: "means",
  },
  {
    label: "Hoog: het zal waarschijnlijk binnen enkele dagen weer gebeuren",
    value: "high",
  },
  {
    label: "Zeer hoog: het zal waarschijnlijk binnen 24 uur weer gebeuren",
    value: "very_high",
  },
];

export const INFORM_WHO_OPTIONS = [
  "Met maatregel: jeugdbeschermer",
  "Met maatregel: jeugdreclasseerder",
  "Met maatregel: voogd",
  "Met maatregel: gezaghebbende ouders",
  "Met maatregel: ouders",
  "Met maatregel: mentor",
  "Met maatregel: PGB vertegenwoordiger",
  "Met maatregel: niemad (ZIN / 18+).",
];

export const ORGANIZATIONAL_OPTIONS = [
  "Budget/management prioriteiten",
  "Cultuur / werkplek",
  "Formatie / bezetting",
  "Kennis / deskundigheid niet aanwezig",
  "Logistiek",
  "Onderbewetting / Onvoldoende ingewerkt / begeleid",
  "Overdracht",
  "Overleg",
  "Planning",
  "Protocol / afspraak niet aanwezig of onduidelijk",
  "Taken, bevoegdheden en verantwoordelijkheden",
];

export const TECHNICAL_OPTIONS = [
  "Accomodatie / terrein",
  "Alarmering",
  "Apparatuur",
  "Bediening / onjuist gebruik",
  "Gebouw-gebonden",
  "Handleidingen",
  "Hulpmiddelen",
  "ICT",
  "Instructie",
  "Materiaal defect",
  "Onderhoud",
  "Onduidelijke instructie",
  "Stolen / sleutels",
];
export const MESE_WORKER_OPTIONS = [
  "Afgeleid",
  "Conditie",
  "Deskundigheid",
  "Ervaring",
  "Fysieke belasting",
  "Bekwaamheid / bevoegdheid",
  "Ingewerkt zijn",
  "Oplettendheid / vergissen",
  "Protocol / instructie niet nageleefd",
  "Teamsfeer",
  "Veiligheidsbewustzijn",
  "Werkdruk",
  "Zorgvuldigheid",
  "Invalmedewerker niet goed op de hoogte",
  "Persoonlijke omstandigheden medewerker",
];

export const CLIENT_OPTIONS = [
  "Alcohol en drugs",
  "Conditie / fysieke toestand",
  "Culturele achtergrond",
  "Gedrag van cliënt",
  "Groepssamenstelling",
  "Juridische status",
  "Medicatie",
  "Onbekende risici?s",
  "Psychische toestand cliënt",
  " Therapietrouw / motivatie",
  "Familie van de cliënt",
  "Waarden en normen",
  "Ziektebeeld",
  "Taalproblematiek",
  "De wijwe waarop de zorg uitgevoerd moet worden is niet haalbaar",
  "Niet opvolgen huisregels",
];

export const SUCCESSION_OPTIONS = [
  "Besproken met betrokken medewerker(s)",
  "Besproken in teamvergadering",
  "Besproken met betrokken client",
  "Terugkoppeling gedaan naar melder",
  "Besproken met MT",
  "Besproken met overige betrokkenen, nl.:",
];

export const REPORTER_INVOLVEMENT_OPTIONS = [
  { label: "Selecter status", value: "" },
  { label: "Direct betrokken", value: "directly_involved" },
  { label: "Getuige", value: "witness" },
  { label: "Achteraf aangetroffen", value: "found_afterwards" },
  { label: "Gealarmeerd", value: "alarmed" },
];
export const ATTENTION_RISKS_OPTIONS = [
  { label: "Selecter status", value: "" },
  { label: "Wonen", value: "living" },
  { label: "Dagbesteding", value: "datetime" },
  { label: "Verslaving/Middelen-Gebruik", value: "addiction_resources_use" },
  { label: "Financiën", value: "finances" },
  { label: "Gedrag", value: "behaviour" },
  { label: "Pstychische Gezondheid", value: "psychic_health" },
  { label: "Lichamelijke Gezondheid", value: "physical_health" },
  { label: "Familie", value: "family" },
  { label: "Partner/Kinderen", value: "partner_children" },
  { label: "Vrienden", value: "friends" },
];

export const YES_NO_OPTIONS = [
  { label: "Selecter status", value: "" },
  { label: "Nee", value: "yes" },
  { label: "Ja", value: "no" },
];

export const TYPES_INCIDENT_OPTIONS = [
  { label: "Selecter status", value: "" },
  { label: "gevaarlijke situatie (bijna incident)", value: "yes" },
  { label: "incident", value: "no" },
  { label: "calamiteit", value: "nxo" },
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

export const EMPLOYEE_ABSENTEEISM_OPTIONS = [
  { label: "Selecteer Bron", value: "" },
  { label: "Geen ziekteverzuim", value: "BRP" },
  { label: "Ziekteverzuim ‹ 3 dagen", value: "ID" },
  { label: "Ziekteverzuim minder dan een half jaar", value: "passport" },
  { label: "Ziekteverzuim minder dan een jaar", value: "policy_card" },
  {
    label: "Langdurig ziekteverzuim › meer dan een jaar",
    value: "government_agency_letter",
  },
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

export const CONTRACT_STATUS_TRANSLATION_DICT: Record<ContractStatus, string> = {
  draft: "Concept",
  approved: "Goedgekeurd",
  terminated: "Beëindigd",
};

export const FINANCING_LAW_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Financieringswet", value: "" },
  { label: "Wmo 2015", value: "WMO" },
  { label: "Zorgverzekeringswet (Zvw)", value: "ZVW" },
  { label: "Wet langdurige zorg (WLZ)", value: "WLZ" },
  { label: "Jeugdwet (JW)", value: "JW" },
  { label: "Wet publieke gezondheidszorg (Wpg)", value: "WPG" },
];

export const FINANCING_LAW_RECORD = {
  WMO: "Wmo 2015",
  ZVW: "Zorgverzekeringswet (Zvw)",
  WLZ: "Wet langdurige zorg (WLZ)",
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
  "program_counselor",
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
  { label: "Trajectbegeleider", value: "program_counselor" },
];

export const EMPLOYEE_ASSIGNMENT_RECORD = {
  care_nurse: "Verzorging / Verpleging",
  first_responsible: "Eerst Verantwoordelijke",
  mentor: "Mentor",
  personal_coach: "Persoonlijke Coach",
  care_coordinator: "Zorgcoördinator",
  outpatient_counselor: "Ambulant Begeleider",
  "co-mentor": "Co-Mentor",
  program_counselor: "Trajectbegeleider",
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

export const DAILY_REPORT_TYPES = [
  "morning_report",
  "evening_report",
  "night_report",
  "shift_report",
  "one_to_one_report",
  "process_report",
  "contact_journal",
  "other",
] as const;

export const DAILY_REPORT_TYPES_OPTIONS: SelectionOption[] = [
  { label: "Selecteer Rapport Type", value: "" },
  { label: "Ochtendrapport", value: "morning_report" },
  { label: "Avondrapport", value: "evening_report" },
  { label: "Nachtrapport", value: "night_report" },
  { label: "Tussenrapport", value: "shift_report" },
  { label: "1 op 1 Rapportage", value: "one_to_one_report" },
  { label: "Procesrapportage", value: "process_report" },
  { label: "Contact Journal", value: "contact_journal" },
  { label: "Overige", value: "other" },
];

export const REPORT_TYPE_RECORD = {
  morning_report: "Ochtendrapport",
  evening_report: "Avondrapport",
  night_report: "Nachtrapport",
  shift_report: "Tussenrapport",
  one_to_one_report: "1 op 1 Rapportage",
  process_report: "Procesrapportage",
  contact_journal: "Contact Journal",
  other: "Overige",
};

export const PERMISSION_TRANS = {
  "client.view": "Bekijk cliënt",
  "client.edit": "Bewerk cliënt",
  "client.delete": "Verwijder cliënt",
  "client.create": "Maak cliënt aan",
  "client.identity.view": "Bekijk cliënt identiteit",
  "client.identity.edit": "Bewerk cliënt identiteit",
  "employee.view": "Bekijk medewerker",
  "employee.edit": "Bewerk medewerker",
  "employee.delete": "Verwijder medewerker",
  "employee.create": "Maak medewerker aan",
  "employee.permissions.view": "Bekijk medewerker rechten",
  "employee.permissions.edit": "Bewerk medewerker rechten",
  "contact.view": "Contact voor noodgevallen bekijken",
  "contact.edit": "Contact voor noodgevallen bewerken",
  "contact.delete": "Contact voor noodgevallen verwijderen",
  "contact.create": "noodcontact aanmaken",
  "contract.view": "Bekijk contract",
  "contract.edit": "Bewerk contract",
  "contract.delete": "Verwijder contract",
  "contract.create": "Maak contract aan",
  "edit.client.status": "Bewerk cliënt status",
  "care_plan.view": "Bekijk zorgplan",
  "care_plan.edit": "Bewerk zorgplan",
  "care_plan.delete": "Verwijder zorgplan",
  "care_plan.create": "Maak zorgplan aan",
  "location.view": "locaties beheren",
  "view.own.profile": "Bekijk eigen profiel",
  "notifications.view": "Bekijk notificaties",
  "dashboard.view": "Bekijk dashboard",
  "finance.view": "Beheer financiën",
  "care_coordination.view": "Beheer zorgcoördinatie",
  "contacts.view": "Beheer contacten",
  "contracts.view": "Contracten beheren",
  "care_plans.view": "Zorgplannen beheren",
  "tasks.view": "Beheer taken",
  "conversation.view": "Bekijk conversaties",
  "manage.domain.levels": "Beheer domein niveaus",
  "approve.goals": "Keur doelen goed",
  "settings.view": "Bekijk instellingen",
  "permissions.edit": "Bewerk rechten",
  "activity_logs.view": "Activiteitenlogboeken bekijken",
  "medication.notifications.receive": "Medische meldingen ontvangen",
};

export type PermissionType = keyof typeof PERMISSION_TRANS;

export const EMOTIONAL_STATE_OPTIONS = [
  { label: "Selecteer Emotionele Staat", value: "" },
  { label: "😃 Blij", value: "excited" },
  { label: "😊 Gelukkig", value: "happy" },
  { label: "😢 Verdrietig", value: "sad" },
  { label: "😐 Normaal", value: "normal" },
  { label: "😰 Angstig", value: "anxious" },
  { label: "😞 Depressief", value: "depressed" },
  { label: "😡 Boos", value: "angry" },
];

export const DOCUMENT_LABELS = {
  registration_form: "Registratieformulier",
  intake_form: "Intakeformulier",
  consent_form: "Toestemmingsformulier",
  risk_assessment: "Risicoanalyse",
  self_reliance_matrix: "Zelfredzaamheidsmatrix",
  force_inventory: "Force Inventaris",
  care_plan: "Zorgplan",
  signaling_plan: "Signaleringsplan",
  cooperation_agreement: "Samenwerkingsovereenkomst",
  other: "Overige",
};

export const DOCUMENT_LABEL_OPTIONS = [
  { label: "Selecteer Document", value: "" },
  { label: "Registratieformulier", value: "registration_form" },
  { label: "Intakeformulier", value: "intake_form" },
  { label: "Toestemmingsformulier", value: "consent_form" },
  { label: "Risicoanalyse", value: "risk_assessment" },
  { label: "Zelfredzaamheidsmatrix", value: "self_reliance_matrix" },
  { label: "Force Inventaris", value: "force_inventory" },
  { label: "Zorgplan", value: "care_plan" },
  { label: "Signaleringsplan", value: "signaling_plan" },
  { label: "Samenwerkingsovereenkomst", value: "cooperation_agreement" },
  { label: "Overige", value: "other" },
];
