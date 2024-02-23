import api from "@/utils/api";
import { CertifResDto } from "@/types/certificates/certif-res.dto";
import { useMutation, useQueryClient } from "react-query";
import { UpdateExpDto } from "@/types/experiences/update-exp.dto";
import { ExpResDto } from "@/types/experiences/exp-res.dto";
import { AxiosResponse } from "axios";

async function updateExperience(data: UpdateExpDto) {
  const response = await api.patch<ExpResDto>(
    `employee/experiencesRUD/${data.id}/`,
    data
  );
  return response.data;
}

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        "employees",
        response.employee,
        "experiences",
      ]);
    },
  });
};
