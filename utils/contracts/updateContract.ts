import api from "@/utils/api";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { useMutation, useQueryClient } from "react-query";

async function updateContract(data: Partial<ContractResDto>) {
  const { id: contractId, ...rest } = data;
  const response = await api.patch<ContractResDto>(
    `client/contract_update/${contractId}/`,
    rest
  );
  return response.data;
}

export const useUpdateContract = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContract,
    onSuccess: (res) => {
      queryClient.invalidateQueries([res.client_id, "contracts"]);
      queryClient.invalidateQueries(["contracts"]);
    },
  });
};
