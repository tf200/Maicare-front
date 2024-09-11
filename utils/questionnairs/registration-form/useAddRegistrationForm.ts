import { RegistrationFormType } from "@/types/questionnaire/registration-form";
import api from "@/utils/api";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";


export const useCreateRegistrationForm = (clientId: number) => {
  const queryClient = useQueryClient();

  const createRegistrationForm = useCallback(
    async (values: RegistrationFormType) => {
      const response = await api.post<RegistrationFormType>(
        `/clients/${clientId}/questionnaires/youth-care-applications/add`,
        values
      );
      return response.data;
    },
    [clientId]
  );

  return useMutation({
    mutationFn: createRegistrationForm,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "registration-form"]);
    },
  });
};
