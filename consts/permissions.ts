// export const CLIENT_VIEW = "client.view";
// export const CLIENT_EDIT = "client.edit";
// export const CLIENT_DELETE = "client.delete";
// export const CLIENT_CREATE = "client.create";

// export const CLIENT_CONTRACT_CRUD = "client_contract.view";
// export const CLIENT_CONTRACT_EDIT = "client_contract.edit";
// export const CLIENT_CONTRACT_DELETE = "client_contract.delete";
// export const CLIENT_CONTRACT_CREATE = "client_contract.create";

export const CLIENT_CRUD = "client";
export const CLIENT_VIEW = "client.view";

export const EMPLOYEE_CRUD = "employee";
export const EMPLOYEE_VIEW = "employee.view";

export const CLIENT_CONTRACT_CRUD = "client_contract";
export const EMPLOYEE_CONTRACT_CRUD = "employee_contract";
export const CARE_COORDINATION_CRUD = "care_coordination";
export const FINANCE_CRUD = "finance";


export const PERMISSIONS = [
  CLIENT_CRUD,
  CLIENT_VIEW,
  EMPLOYEE_CRUD,
  EMPLOYEE_VIEW,
  CLIENT_CONTRACT_CRUD,
  EMPLOYEE_CONTRACT_CRUD,
  CARE_COORDINATION_CRUD,
  FINANCE_CRUD
] as const;

export const ADMIN = "ADMIN";
export const BEHAVIORAL_SPECIALIST = "BEHAVIORAL_SPECIALIST";
export const MANAGEMENT = "MANAGEMENT";
export const TRAJECTORY_GUIDE = "TRAJECTORY_GUIDE";
export const PEDAGOGICAL_WORKER = "PEDAGOGICAL_WORKER";
export const BACK_OFFICE = "BACK_OFFICE";
export const ADMINISTRATIVE_ASSISTANT = "ADMINISTRATIVE_ASSISTANT";

export const USER_ROLES = [
  ADMIN,
  BEHAVIORAL_SPECIALIST,
  MANAGEMENT,
  TRAJECTORY_GUIDE,
  PEDAGOGICAL_WORKER,
  BACK_OFFICE,
  ADMINISTRATIVE_ASSISTANT,
] as const;

export const PERMISSION_CONFIGURATIONS: Record<
  (typeof USER_ROLES)[number],
  (typeof PERMISSIONS)[number][]
> = {
  ADMIN: [...PERMISSIONS],
  BEHAVIORAL_SPECIALIST: [CLIENT_CRUD, EMPLOYEE_CRUD],
  MANAGEMENT: [CLIENT_VIEW, EMPLOYEE_VIEW],
  TRAJECTORY_GUIDE: [CLIENT_VIEW],
  PEDAGOGICAL_WORKER: [CLIENT_VIEW],
  BACK_OFFICE: [CLIENT_CRUD, EMPLOYEE_CRUD],
  ADMINISTRATIVE_ASSISTANT: [CLIENT_CRUD, EMPLOYEE_CRUD],
};
