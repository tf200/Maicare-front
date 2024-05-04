import { PERMISSIONS, USER_ROLES } from "@/consts";

export type Role = (typeof USER_ROLES)[number];
export type Permission = (typeof PERMISSIONS)[number];

export type CreateGroupReqDto = {
  name: string;
  permissions: string[];
};

export type UpdateGroupReqDto = Partial<CreateGroupReqDto>;

export type PermissionsListDto = string[];

export type GroupDetailsResDto = {
  id: number;
  name: string;
  permissions: PermissionsListDto;
};

export type GroupListResDto = GroupDetailsResDto[];
