import api from "@/utils/api";
import { NewAssignReqDto } from "@/types/role-assignments/new-assign-req.dto";
import { useMutation, useQueryClient } from "react-query";
import { AssignedRoleResDto } from "@/types/role-assignments/assigned-role-res.dto";

async function createRoleAssignment(data: NewAssignReqDto) {
  const response = await api.post<AssignedRoleResDto>("ad/assign-group/", data);
  return response.data;
}

export const useCreateRoleAssignment = (employeeId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRoleAssignment,
    onSuccess: (res) => {
      console.log(res);
      queryClient.invalidateQueries(["employees", employeeId, "teams"]);
    },
  });
};
