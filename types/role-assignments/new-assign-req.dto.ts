import { RoleAssignmentFormType } from "@/types/role-assignments/role-assignment-form-type";

export type NewAssignReqDto = RoleAssignmentFormType & {
  user_id: number;
};
