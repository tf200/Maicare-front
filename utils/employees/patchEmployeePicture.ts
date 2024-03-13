import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NewEmployeesRequest } from "@/types/employees/new-employees-request";

const PatchEmployeePic = async (employeeId: number, data: any) => {
  const formData = new FormData();
  formData.append("profile_picture", data.profile_picture);
  const response = await api.patch<NewEmployeesRequest>(
    `employee/employee_pic/${employeeId}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export const usePatchEmployeePic = (employeeId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => PatchEmployeePic(employeeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees", employeeId]);
    },
  });
};
