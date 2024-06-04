import { DataSharingType } from "@/types/questionnaire/data-sharing";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function createDataSharing(collab) {
  const response = await api.post<DataSharingType>(
    "/clients/questionnairs/data-sharing-statements/add",
    collab
  );
  return response.data;
}

export const useCreateDataSharing = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDataSharing,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "data-sharing"]);
    },
  });
};
