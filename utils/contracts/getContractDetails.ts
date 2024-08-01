import api from "@/utils/api";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { useQuery } from "react-query";

async function getContractDetails(contractId: number): Promise<ContractResDto> {
  const response = await api.get<ContractResDto>(`/clients/contracts/${contractId}`);
  return response.data;
}

export const useContractDetails = (clientId: number, contractId: number) => {
  return useQuery({
    queryKey: [clientId, "contracts", contractId],
    queryFn: () => getContractDetails(contractId),
  });
};
