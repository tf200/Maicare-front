import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteEmployee(employeeId: number) {
  const response = await api.delete(`employee/employees_RUD/${employeeId}/`);
  return response.data;
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });
};
