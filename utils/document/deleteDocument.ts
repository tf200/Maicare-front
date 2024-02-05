import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export async function deleteDocument(documentId: number) {
  const response = await api.delete("/client/document_delete/" + documentId);
  return response.data;
}

export const useDeleteDocument = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (documentId: number) => {
      return deleteDocument(documentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([client, "documents"]);
    },
  });
};
