import api from "@/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchDocuments =
  (clientId: string, page = 1) =>
  async () => {
    const response = await api.get(`client/document_list/${clientId}/`, {
      params: {
        page,
      },
    });
    return response.data;
  };

export const useDocumentList = (clientId: string) => {
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: [parseInt(clientId), "documents", page],
    queryFn: fetchDocuments(clientId, page),
    keepPreviousData: true,
  });

  return {
    ...query,
    setPage,
    page,
  };
};
