export const CLIENT_VIEW = "client.view";
export const CLIENT_EDIT = "client.edit";
export const CLIENT_DELETE = "client.delete";
export const CLIENT_CREATE = "client.create";
export const CLIENT_CONTRACT_VIEW = "client_contract.view";
export const CLIENT_CONTRACT_EDIT = "client_contract.edit";
export const CLIENT_CONTRACT_DELETE = "client_contract.delete";
export const CLIENT_CONTRACT_CREATE = "client_contract.create";

export const PERMISSIONS = [
  CLIENT_VIEW,
  CLIENT_EDIT,
  CLIENT_DELETE,
  CLIENT_CREATE,
  CLIENT_CONTRACT_VIEW,
  CLIENT_CONTRACT_EDIT,
  CLIENT_CONTRACT_DELETE,
  CLIENT_CONTRACT_CREATE,
] as const;

export const ADMIN = "ADMIN";
export const SUPERVISOR = "SUPERVISOR";
export const CAREGIVER = "CAREGIVER";
export const CLIENT = "CLIENT";

export const USER_ROLES = [ADMIN, SUPERVISOR, CAREGIVER, CLIENT] as const;

export const PERMISSION_CONFIGURATIONS: Record<
  (typeof USER_ROLES)[number],
  (typeof PERMISSIONS)[number][]
> = {
  ADMIN: [...PERMISSIONS],
  SUPERVISOR: [CLIENT_VIEW, CLIENT_EDIT, CLIENT_CREATE],
  CAREGIVER: [CLIENT_VIEW],
  CLIENT: [],
};
