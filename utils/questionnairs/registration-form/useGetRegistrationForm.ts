import api from "@/utils/api";
import { useQuery } from "react-query";

const fetchRegistrationForm = (RegistrationFormId: number) => async () => {
  const response = await api.get(`/clients/questionnaires/youth-care-applications/${RegistrationFormId}/details
  `);
  return response.data;
};

export const useGetSingleRegistrationForm = (RegistrationFormId: number, clientId: number) => {
  const query = useQuery({
    queryKey: [clientId, "registration-form", RegistrationFormId],
    queryFn: fetchRegistrationForm(RegistrationFormId),
    keepPreviousData: true,
    enabled: !!RegistrationFormId,
  });

  return {
    ...query,
  };
};
