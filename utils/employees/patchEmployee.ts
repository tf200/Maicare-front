import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { EmployeeFormType } from "@/types/employees/employee-form-type";
import { EmployeeResDto } from "@/types/employees/employee-res.dto";

export async function patchEmployee(data: EmployeeFormType) {
  const response = await api.patch<EmployeeResDto>(`/employee/employees_RUD/${data.id}/`, data);

  return response.data;
}

export const usePatchEmployee = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeeFormType) => patchEmployee(data),

    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
