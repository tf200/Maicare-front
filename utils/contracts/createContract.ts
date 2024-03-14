import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";
import api from "@/utils/api";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { useMutation, useQueryClient } from "react-query";

async function createContract(data: NewContractReqDto) {
  const response = await api.post<ContractResDto>(
    "client/contract_create/",
    data
  );
  return response.data;
}

export const useCreateContract = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContract,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "contracts"]);
      queryClient.invalidateQueries(["contracts"]);
    },
  });
};
