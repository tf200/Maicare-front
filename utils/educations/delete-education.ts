import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteEducation(educationId: number) {
  const response = await api.delete(`employee/educationsRUD/${educationId}/`);
  return response.data;
}

export const useDeleteEducation = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees", clientId, "educations"]);
    },
  });
};
