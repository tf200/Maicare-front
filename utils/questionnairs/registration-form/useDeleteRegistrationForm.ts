import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteRegistrationForm(dataId: number) {
  const response = await api.delete(`/clients/questionnaires/youth-care-applications/${dataId}/delete`);
  return response.data;
}

export const useDeleteRegistrationForm = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRegistrationForm,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "registration-form"]);
    },
  });
};
