import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { RegistrationFormType } from "@/types/questionnaire/registration-form";
import { StressManagementPlansType } from "@/types/questionnaire/stress-management-plans";
import api from "@/utils/api";
import { useQuery } from "react-query";

type StressManagementPlansTypeRes = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: StressManagementPlansType[];
};

export const getAllStressManagementPlans = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<StressManagementPlansTypeRes>(
    `/clients/${clientId}/questionnaires/stress-management-plans`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetAllStressManagementPlans = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "stress-management-plans", params ?? parsedParams],
    queryFn: () => getAllStressManagementPlans(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
