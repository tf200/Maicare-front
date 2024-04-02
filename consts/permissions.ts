export const CLIENT_VIEW = "client.view";
export const CLIENT_EDIT = "client.edit";
export const CLIENT_DELETE = "client.delete";
export const CLIENT_CREATE = "client.create";

export const EMPLOYEE_VIEW = "employee.view";
export const EMPLOYEE_EDIT = "employee.edit";
export const EMPLOYEE_DELETE = "employee.delete";
export const EMPLOYEE_CREATE = "employee.create";

export const CONTACT_VIEW = "contact.view";
export const CONTACT_EDIT = "contact.edit";
export const CONTACT_DELETE = "contact.delete";
export const CONTACT_CREATE = "contact.create";

export const CONTRACT_VIEW = "contract.view";
export const CONTRACT_EDIT = "contract.edit";
export const CONTRACT_DELETE = "contract.delete";
export const CONTRACT_CREATE = "contract.create";

export const CARE_PLAN_VIEW = "care_plan.view";
export const CARE_PLAN_EDIT = "care_plan.edit";
export const CARE_PLAN_DELETE = "care_plan.delete";
export const CARE_PLAN_CREATE = "care_plan.create";

export const ROLE_VIEW = "role.view";
export const ROLE_CUD = "role.cud";

export const LOCATION_VIEW = "location.view";

export const VIEW_OWN_PROFILE = "view.own.profile";

export const DASHBOARD_VIEW = "dashboard.view";

export const FINANCE_VIEW = "finance.view";

export const CARE_COORDINATION_VIEW = "care_coordination.view";
export const CONTACTS_VIEW = "contacts.view";
export const CONTRACTS_VIEW = "contracts.view";
export const CARE_PLANS_VIEW = "care_plans.view";

export const TASKS_VIEW = "tasks.view";

export const CONVERSATION_VIEW = "conversation.view";

export const PERMISSIONS = [
  CLIENT_VIEW,
  CLIENT_EDIT,
  CLIENT_DELETE,
  CLIENT_CREATE,

  EMPLOYEE_VIEW,
  EMPLOYEE_EDIT,
  EMPLOYEE_DELETE,
  EMPLOYEE_CREATE,

  VIEW_OWN_PROFILE,

  ROLE_VIEW,
  ROLE_CUD,

  LOCATION_VIEW,

  DASHBOARD_VIEW,

  FINANCE_VIEW,

  CARE_COORDINATION_VIEW,
  CONTACTS_VIEW,
  CONTRACTS_VIEW,
  CARE_PLANS_VIEW,
  TASKS_VIEW,

  CONVERSATION_VIEW,
] as const;

export const ADMIN = "ADMIN";
export const BEHAVIORAL_SPECIALIST = "BEHAVIORAL_SPECIALIST";
export const MANAGEMENT = "MANAGEMENT";
export const TRAJECTORY_GUIDE = "TRAJECTORY_GUIDE";
export const PEDAGOGICAL_WORKER = "PEDAGOGICAL_WORKER";
export const BACK_OFFICE = "BACK_OFFICE";
export const ADMINISTRATIVE_ASSISTANT = "ADMINISTRATIVE_ASSISTANT";
export const OUTPATIENT_COMPANION = "OUTPATIENT_COMPANION";
export const PROGRAM_COUNSELOR = "PROGRAM_COUNSELOR";
export const PRACTITIONER = "PRACTITIONER";
export const DEFAULT = "Default";

export const USER_ROLES = [
  ADMIN,
  BEHAVIORAL_SPECIALIST,
  MANAGEMENT,
  TRAJECTORY_GUIDE,
  PEDAGOGICAL_WORKER,
  BACK_OFFICE,
  ADMINISTRATIVE_ASSISTANT,
  DEFAULT,
  OUTPATIENT_COMPANION,
  PROGRAM_COUNSELOR,
  PRACTITIONER,
] as const;

export const PERMISSION_CONFIGURATIONS: Record<
  (typeof USER_ROLES)[number],
  (typeof PERMISSIONS)[number][]
> = {
  ADMIN: [...PERMISSIONS],
  BEHAVIORAL_SPECIALIST: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
  MANAGEMENT: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
  TRAJECTORY_GUIDE: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
  PEDAGOGICAL_WORKER: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
  BACK_OFFICE: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    CLIENT_CREATE,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    EMPLOYEE_CREATE,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
  ADMINISTRATIVE_ASSISTANT: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    CLIENT_CREATE,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    EMPLOYEE_CREATE,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
  Default: [DASHBOARD_VIEW, VIEW_OWN_PROFILE],
  OUTPATIENT_COMPANION: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
  PROGRAM_COUNSELOR: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
  PRACTITIONER: [
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CONVERSATION_VIEW,
    DASHBOARD_VIEW,
  ],
};
export const ORGANIGRAM_TRANSLATE = {
  ADMIN: "Admin",
  BEHAVIORAL_SPECIALIST: "Gedragswetenschapper",
  MANAGEMENT: "Beheer",
  TRAJECTORY_GUIDE: "Trajectbegeleider",
  PEDAGOGICAL_WORKER: "Pedagogisch medewerker",
  BACK_OFFICE: "Backoffice",
  ADMINISTRATIVE_ASSISTANT: "Administratief medewerker",
  Default: "Automatisch toegewezen rol",
  OUTPATIENT_COMPANION: "Ambulant begeleider",
  PROGRAM_COUNSELOR: "Programmabegeleider",
  PRACTITIONER: "Behandelaar",
};
