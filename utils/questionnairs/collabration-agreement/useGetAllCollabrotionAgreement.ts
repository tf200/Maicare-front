import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import { CollaborationAgreementsType } from "@/types/questionnaire/collaboration-agreement";
import api from "@/utils/api";
import { useQuery } from "react-query";

type CollaborationAgreementsTypeRes = {
  count: number;
  next: string;
  previous: string;
  page_size?: number;
  results: CollaborationAgreementsType[];
};

export const getCollaborationList = async (clientId: number, params: PaginationParams) => {
  const response = await api.get<CollaborationAgreementsTypeRes>(
    `/clients/${clientId}/questionnairs/collaboration_agreements`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetCollborationList = (clientId: number, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [clientId, "collaboration-agreement", params ?? parsedParams],
    queryFn: () => getCollaborationList(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
