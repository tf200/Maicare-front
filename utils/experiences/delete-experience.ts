import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteExperience(experienceId: number) {
  const response = await api.delete(`employee/experiencesRUD/${experienceId}/`);
  return response.data;
}

export const useDeleteExperience = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees", clientId, "experiences"]);
    },
  });
};
