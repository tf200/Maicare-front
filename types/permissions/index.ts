import { PERMISSIONS, USER_ROLES } from "@/consts";

export type Role = (typeof USER_ROLES)[number];
export type Permission = (typeof PERMISSIONS)[number];
