import api from "@/utils/api";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { useMutation, useQueryClient } from "react-query";
import { PatchContractReqDto } from "@/types/contracts";

async function updateContract(contractId: number, data: PatchContractReqDto) {
  const response = await api.patch<ContractResDto>(
    `client/contract_update/${contractId}/`,
    data
  );
  return response.data;
}

export const useUpdateContract = (contractId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PatchContractReqDto) => updateContract(contractId, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries([res.client_id, "contracts"]);
      queryClient.invalidateQueries(["contracts"]);
    },
  });
};
