import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { ConsentDeclarationType } from "@/types/questionnaire/consent-declaration-type";
import api from "@/utils/api";
import { useQuery } from "react-query";

type ConsentDeclarationTypeRes = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: ConsentDeclarationType[];
};

export const getAllConsentDeclaration = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<ConsentDeclarationTypeRes>(
    `/clients/${clientId}/questionnairs/consent-declarations`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetAllConsentDeclaration = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "consent-declaration", params ?? parsedParams],
    queryFn: () => getAllConsentDeclaration(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
