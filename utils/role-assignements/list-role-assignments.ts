import { RoleListResDto } from "@/types/roles/role-list-res.dto";
import api from "@/utils/api";
import { useQuery } from "react-query";
import { AssignedRolesListDto } from "@/types/role-assignments/assigned-roles-list.dto";

async function listRoleAssignments(employeeId: number) {
  const response = await api.get<AssignedRolesListDto>(
    `/system/administration/group-access/employee/${employeeId}`
  );
  return response.data;
}

export const useListRoleAssignments = (employeeId: number) => {
  return useQuery({
    queryFn: () => listRoleAssignments(employeeId),
    queryKey: ["employees", employeeId, "teams"],
  });
};
