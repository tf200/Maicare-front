import { DEFAULT_PAGINATION_PARAMS } from "@/consts";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchDocuments =
  (clientId: string, params: PaginationParams = DEFAULT_PAGINATION_PARAMS) =>
  async () => {
    const response = await api.get(`client/document_list/${clientId}/`, {
      params,
    });
    return response.data;
  };

export const useDocumentList = (clientId: string, params?: PaginationParams) => {
  const pagination = usePaginationParams();
  const parsedParams = pagination.params;

  const query = useQuery({
    queryKey: [parseInt(clientId), "documents", params ?? parsedParams],
    queryFn: fetchDocuments(clientId, params ?? parsedParams),
    keepPreviousData: true,
  });

  return {
    ...query,
    pagination,
  };
};
