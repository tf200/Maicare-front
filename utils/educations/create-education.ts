import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { EducationResDto, NewEducationReqDto } from "@/types/educations";

async function createEducation(data: NewEducationReqDto) {
  const response = await api.post<EducationResDto>(
    "employee/educations/create/",
    data
  );
  return response.data;
}

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        "employees",
        response.employee,
        "educations",
      ]);
    },
  });
};
