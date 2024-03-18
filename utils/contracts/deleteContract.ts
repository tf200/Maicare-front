import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteContract(clientId: number) {
  const response = await api.delete(`client/contract_delete/${clientId}/`);
  return response.data;
}

export const useDeleteContract = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContract,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "contracts"]);
      queryClient.invalidateQueries(["contracts"]);
    },
  });
};
