import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteDataSharing(dataId: number) {
  const response = await api.delete(
    `/clients/questionnairs/data-sharing-statements/${dataId}/delete`
  );
  return response.data;
}

export const useDeleteDataSharing = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDataSharing,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "data-sharing"]);
    },
  });
};
