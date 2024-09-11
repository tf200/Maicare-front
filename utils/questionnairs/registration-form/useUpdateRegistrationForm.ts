import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const UpdateRegistrationForm = async (data: any) => {
  const response = await api.post(
    `/clients/questionnaires/youth-care-applications/${data.id}/update`,
    data
  );
  return response.data;
};

export const useUpdateRegistrationForm = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateRegistrationForm,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "registration-form"]);
    },
  });
};
