import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NewEmployeesRequest } from "@/types/employees/new-employees-request";

const PatchEmployeePic = async (data: any) => {
  const formData = new FormData();
  formData.append("profile_picture", data.profile_picture);
  const response = await api.patch<NewEmployeesRequest>(
    `employee/employee_pic/${data.employeeId}/`,
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

export const usePatchEmployeePic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchEmployeePic,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
    },
  });
};
