import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteInvolvedEmployee(clientId: number) {
  const response = await api.delete(
    `employee/clientassignment_rud/${clientId}/`
  );
  return response.data;
}

export const useDeleteInvolvedEmployee = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInvolvedEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "involved"]);
    },
  });
};
