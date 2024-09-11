import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { RegistrationFormType } from "@/types/questionnaire/registration-form";
import api from "@/utils/api";
import { useQuery } from "react-query";

type RegistrationFormTypeRes = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: RegistrationFormType[];
};

export const getAllRegistrationForms = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<RegistrationFormTypeRes>(
    `/clients/${clientId}/questionnaires/youth-care-applications`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetAllRegistrationForms = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "registration-form", params ?? parsedParams],
    queryFn: () => getAllRegistrationForms(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
