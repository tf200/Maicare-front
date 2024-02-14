import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { EducationResDto, UpdateEducationReqDto } from "@/types/educations";

async function updateCertificate(data: UpdateEducationReqDto) {
  const response = await api.patch<EducationResDto>(
    `employee/educationsRUD/${data.id}/`,
    data
  );
  return response.data;
}

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCertificate,
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        "employees",
        response.employee,
        "educations",
      ]);
    },
  });
};
