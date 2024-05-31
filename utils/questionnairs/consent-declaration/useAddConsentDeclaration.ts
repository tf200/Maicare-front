import { ConsentDeclarationType } from "@/types/questionnaire/consent-declaration-type";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function createConsentDeclaration(collab) {
  const response = await api.post<ConsentDeclarationType>(
    "/clients/questionnairs/consent-declarations",
    collab
  );
  return response.data;
}

export const useCreateConsentDeclaration = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConsentDeclaration,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "consent-declaration"]);
    },
  });
};
