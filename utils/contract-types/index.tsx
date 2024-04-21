import api from "@/utils/api";
import { ContractTypesResDto } from "@/types/contract-type";
import { useQuery } from "react-query";

async function getContractTypes() {
  const response = await api.get<ContractTypesResDto>(
    "clients/contracts/contract-types"
  );
  return response.data;
}

export const useContractTypes = () => {
  return useQuery("contractTypes", getContractTypes);
};
