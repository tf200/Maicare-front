import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteConsentDeclaration(dataId: number) {
  const response = await api.delete(`/clients/questionnairs/consent-declarations/${dataId}/delete`);
  return response.data;
}

export const useDeleteConsentDeclaration = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteConsentDeclaration,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "consent-declaration"]);
    },
  });
};
