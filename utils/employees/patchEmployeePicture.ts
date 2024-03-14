import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewEmployeesRequest } from "@/types/employees/new-employees-request";

const patchEmployeePic = async (employeeId: number, profilePicture: string) => {
  const formData = new FormData();
  formData.append("profile_picture", profilePicture);
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
    mutationFn: (profilePicture: string) =>
      patchEmployeePic(employeeId, profilePicture),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees", employeeId]);
    },
  });
};
