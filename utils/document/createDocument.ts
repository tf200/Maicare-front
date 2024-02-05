import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export async function createDocument(data: {}) {
  const response = await api.post("/client/document_upload/", data);
  return response.data;
}

export const useCreateDocument = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {}) => {
      return createDocument({
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "document",
        {
          client,
        },
      ]);
    },
  });
};
