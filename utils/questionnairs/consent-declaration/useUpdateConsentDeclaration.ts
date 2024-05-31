import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const UpdateConsentDeclaration = async (data: any) => {
  const response = await api.post(
    `/clients/questionnairs/consent-declarations/${data.id}/update`,
    data
  );
  return response.data;
};

export const useUpdateConsentDeclaration = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateConsentDeclaration,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "consent-declaration"]);
    },
  });
};
