import { RoleListResDto } from "@/types/roles/role-list-res.dto";
import api from "@/utils/api";
import { useQuery } from "react-query";

async function listRoleAssignments(employeeId: number) {
  const response = await api.get<RoleListResDto>(
    `ad/user-groups/${employeeId}/`
  );
  return response.data;
}

export const useListRoleAssignments = (employeeId: number) => {
  return useQuery({
    queryFn: () => listRoleAssignments(employeeId),
    queryKey: ["employees", employeeId, "teams"],
  });
};
