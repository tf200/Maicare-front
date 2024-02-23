import api from "@/utils/api";
import { useQuery } from "react-query";
import { NewEmployeesRequest } from "@/types/employees/new-employees-request";

export const getClientDetails = async (employeeId: number) => {
  const response = await api.get<NewEmployeesRequest>(
    `employee/employees_RUD/${employeeId}/`
  );
  return response.data;
};

export const useEmployeeDetails = (employeeId: number) => {
  return useQuery<NewEmployeesRequest>({
    queryFn: () => getClientDetails(employeeId),
    queryKey: ["employees", employeeId],
    enabled: !!employeeId,
  });
};
