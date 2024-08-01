import {
  AddWorkingHoursReqDto,
  WorkingHoursListResDto,
  WorkingHoursResDto,
} from "@/types/contracts";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { usePaginationParams } from "@/hooks/usePaginationParams";

async function createContractWorkingHours(contractId: number, workingHours: AddWorkingHoursReqDto) {
  const response = await api.post<WorkingHoursResDto>(
    `/clients/contracts/${contractId}/working-hours/add`,
    workingHours
  );

  return response.data;
}

export const useCreateContractWorkingHours = (contractId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddWorkingHoursReqDto) => createContractWorkingHours(contractId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["contract-working-hours", contractId]);
    },
  });
};

async function getContractWorkingHours(contractId: number, params?: PaginationParams) {
  const response = await api.get<WorkingHoursListResDto>(
    `/clients/contracts/${contractId}/working-hours`,
    {
      params,
    }
  );

  return response.data;
}

export const useGetContractWorkingHours = (contractId: number) => {
  const pagination = usePaginationParams();
  const query = useQuery({
    queryFn: () => getContractWorkingHours(contractId, pagination.params),
    queryKey: ["contract-working-hours", contractId],
  });
  return {
    ...query,
    pagination,
  };
};
