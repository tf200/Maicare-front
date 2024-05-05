import { NewAssignReqDto } from "@/types/role-assignments/new-assign-req.dto";

export type AssignedRolesListItem = Omit<
  NewAssignReqDto,
  "group_id" | "employee_id"
> & {
  group_name: string;
  id: number;
};

export type AssignedRolesListDto = AssignedRolesListItem[];
