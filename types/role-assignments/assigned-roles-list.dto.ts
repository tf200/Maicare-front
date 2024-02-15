import { NewAssignReqDto } from "@/types/role-assignments/new-assign-req.dto";

export type AssignedRolesListItem = Omit<
  NewAssignReqDto,
  "group_id" | "employee_id"
> & {
  group_name: string;
};

export type AssignedRolesListDto = {
  employee_id: number;
  groups: AssignedRolesListItem[];
};
