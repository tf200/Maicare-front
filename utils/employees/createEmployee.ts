import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewEmployeeReqDto } from "@/types/employees/new-employee-req.dto";
import { EmployeeResDto } from "@/types/employees/employee-res.dto";

const createEmployee = async (req: NewEmployeeReqDto) => {
  const response = await api.post<EmployeeResDto>("employee/employees_create/", req);
  return response.data;
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });
};
