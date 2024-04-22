import api from "@/utils/api";
import {
  ContractTypeCreateReqDto,
  ContractTypeItem,
  ContractTypesResDto,
} from "@/types/contract-type";
import { useMutation, useQuery, useQueryClient } from "react-query";

async function getContractTypes() {
  const response = await api.get<ContractTypesResDto>(
    "clients/contracts/contract-types"
  );
  return response.data;
}

export const useContractTypes = () => {
  return useQuery("contractTypes", getContractTypes);
};

async function deleteContractType(id: number) {
  await api.delete(`clients/contracts/contract-types/${id}/delete`);
}

export const useDeleteContractType = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteContractType, {
    onSuccess: () => {
      queryClient.invalidateQueries("contractTypes");
    },
  });
};

async function createContractType(contractType: ContractTypeCreateReqDto) {
  const response = await api.post<ContractTypeItem>(
    "clients/contracts/contract-types/add",
    contractType
  );
  return response.data;
}

export const useCreateContractType = () => {
  const queryClient = useQueryClient();
  return useMutation(createContractType, {
    onSuccess: () => {
      queryClient.invalidateQueries("contractTypes");
    },
  });
};
