import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteCollab(dataId: number) {
  const response = await api.delete(
    `/clients/questionnairs/collaboration_agreements/${dataId}/delete`
  );
  return response.data;
}

export const useDeleteCollab = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCollab,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "collaboration-agreement"]);
    },
  });
};
