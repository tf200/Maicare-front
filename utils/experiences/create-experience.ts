import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewExpReqDto } from "@/types/experiences/new-exp-req.dto";
import { ExpResDto } from "@/types/experiences/exp-res.dto";

async function createExperience(data: NewExpReqDto) {
  const response = await api.post<ExpResDto>(
    "employee/experiences/create/",
    data
  );
  return response.data;
}

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        "employees",
        response.employee,
        "experiences",
      ]);
    },
  });
};
