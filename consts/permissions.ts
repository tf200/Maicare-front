export const CLIENT_VIEW = "client.view";
export const CLIENT_EDIT = "client.edit";
export const CLIENT_DELETE = "client.delete";
export const CLIENT_CREATE = "client.create";

export const CLIENT_IDENTITY_VIEW = "client.identity.view";
export const CLIENT_IDENTITY_EDIT = "client.identity.edit";

export const EMPLOYEE_VIEW = "employee.view";
export const EMPLOYEE_EDIT = "employee.edit";
export const EMPLOYEE_DELETE = "employee.delete";
export const EMPLOYEE_CREATE = "employee.create";

export const EMPLOYEE_PERMISSIONS_VIEW = "employee.permissions.view";
export const EMPLOYEE_PERMISSIONS_EDIT = "employee.permissions.edit";

export const CONTACT_VIEW = "contact.view";
export const CONTACT_EDIT = "contact.edit";
export const CONTACT_DELETE = "contact.delete";
export const CONTACT_CREATE = "contact.create";
export const VIEW_EMPLOYEE_RIGHTS = "employee.permissions.view";

export const CONTRACT_VIEW = "contract.view";
export const CONTRACT_EDIT = "contract.edit";
export const CONTRACT_DELETE = "contract.delete";
export const CONTRACT_CREATE = "contract.create";

export const EDIT_CLIENT_STATUS = "edit.client.status";

export const CARE_PLAN_VIEW = "care_plan.view";
export const CARE_PLAN_EDIT = "care_plan.edit";
export const CARE_PLAN_DELETE = "care_plan.delete";
export const CARE_PLAN_CREATE = "care_plan.create";

export const LOCATION_VIEW = "location.view";

export const VIEW_OWN_PROFILE = "view.own.profile";

export const NOTIFICATIONS_VIEW = "notifications.view";

export const DASHBOARD_VIEW = "dashboard.view";

export const FINANCE_VIEW = "finance.view";

export const CARE_COORDINATION_VIEW = "care_coordination.view";
export const CONTACTS_VIEW = "contacts.view";
export const CONTRACTS_VIEW = "contracts.view";
export const CARE_PLANS_VIEW = "care_plans.view";

export const TASKS_VIEW = "tasks.view";

export const CONVERSATION_VIEW = "conversation.view";

export const MANAGE_DOMAIN_LEVELS = "manage.domain.levels";

export const APPROVE_GOALS = "approve.goals";

export const SETTINGS_VIEW = "settings.view";
export const PERMISSIONS_EDIT = "permissions.edit";

export const ACTIVITY_LOGS_VIEW = "activity_logs.view";

export const PERMISSIONS = [
  CLIENT_VIEW,
  CLIENT_EDIT,
  CLIENT_DELETE,
  CLIENT_CREATE,

  CLIENT_IDENTITY_VIEW,
  CLIENT_IDENTITY_EDIT,

  EDIT_CLIENT_STATUS,

  EMPLOYEE_VIEW,
  EMPLOYEE_EDIT,
  EMPLOYEE_DELETE,
  EMPLOYEE_CREATE,

  VIEW_OWN_PROFILE,

  EMPLOYEE_PERMISSIONS_VIEW,
  EMPLOYEE_PERMISSIONS_EDIT,

  NOTIFICATIONS_VIEW,

  CONTACT_VIEW,
  CONTACT_EDIT,
  CONTACT_DELETE,
  CONTACT_CREATE,

  CONTRACT_VIEW,
  CONTRACT_EDIT,
  CONTRACT_DELETE,
  CONTRACT_CREATE,

  CARE_PLAN_VIEW,
  CARE_PLAN_EDIT,
  CARE_PLAN_DELETE,
  CARE_PLAN_CREATE,

  LOCATION_VIEW,

  DASHBOARD_VIEW,

  FINANCE_VIEW,

  CARE_COORDINATION_VIEW,
  CONTACTS_VIEW,
  CONTRACTS_VIEW,
  CARE_PLANS_VIEW,
  TASKS_VIEW,

  CONVERSATION_VIEW,

  MANAGE_DOMAIN_LEVELS,

  APPROVE_GOALS,

  SETTINGS_VIEW,
  PERMISSIONS_EDIT,
  ACTIVITY_LOGS_VIEW,
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
export const CARE_COORDINATOR = "CARE_COORDINATOR";
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
  CARE_COORDINATOR,
] as const;

const DEFAULT_PERMISSIONS = [
  DASHBOARD_VIEW,
  VIEW_OWN_PROFILE,
  NOTIFICATIONS_VIEW,
  CONVERSATION_VIEW,
] as const;

export const PERMISSION_CONFIGURATIONS: Record<
  (typeof USER_ROLES)[number],
  (typeof PERMISSIONS)[number][]
> = {
  ADMIN: [...PERMISSIONS],
  BEHAVIORAL_SPECIALIST: [
    ...DEFAULT_PERMISSIONS,
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    MANAGE_DOMAIN_LEVELS,
    APPROVE_GOALS,
  ],
  MANAGEMENT: [
    ...DEFAULT_PERMISSIONS,
    VIEW_OWN_PROFILE,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CLIENT_IDENTITY_EDIT,
    CLIENT_IDENTITY_VIEW,
  ],
  TRAJECTORY_GUIDE: [
    ...DEFAULT_PERMISSIONS,
    CLIENT_VIEW,
    CLIENT_IDENTITY_EDIT,
    CLIENT_IDENTITY_VIEW,
  ],
  PEDAGOGICAL_WORKER: [
    ...DEFAULT_PERMISSIONS,
    CLIENT_VIEW,
    CLIENT_IDENTITY_EDIT,
    CLIENT_IDENTITY_VIEW,
  ],
  BACK_OFFICE: [
    ...DEFAULT_PERMISSIONS,
    CLIENT_VIEW,
    CLIENT_EDIT,
    CLIENT_CREATE,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    EMPLOYEE_CREATE,
  ],
  ADMINISTRATIVE_ASSISTANT: [
    ...DEFAULT_PERMISSIONS,
    CLIENT_VIEW,
    CLIENT_EDIT,
    CLIENT_CREATE,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    EMPLOYEE_CREATE,
  ],
  Default: [...DEFAULT_PERMISSIONS],
  OUTPATIENT_COMPANION: [
    ...DEFAULT_PERMISSIONS,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CLIENT_IDENTITY_EDIT,
    CLIENT_IDENTITY_VIEW,
  ],
  PROGRAM_COUNSELOR: [
    ...DEFAULT_PERMISSIONS,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CONVERSATION_VIEW,
  ],
  PRACTITIONER: [
    ...DEFAULT_PERMISSIONS,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CLIENT_IDENTITY_EDIT,
    CLIENT_IDENTITY_VIEW,
  ],
  CARE_COORDINATOR: [
    ...DEFAULT_PERMISSIONS,
    CLIENT_VIEW,
    CLIENT_EDIT,
    EMPLOYEE_VIEW,
    EMPLOYEE_EDIT,
    CLIENT_IDENTITY_EDIT,
    CLIENT_IDENTITY_VIEW,
    APPROVE_GOALS,
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
