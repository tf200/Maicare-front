import api from "@/utils/api";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { useMutation, useQueryClient } from "react-query";
import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";

async function updateContract(data: ContractResDto) {
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
      queryClient.invalidateQueries([res.client, "contracts"]);
    },
  });
};
