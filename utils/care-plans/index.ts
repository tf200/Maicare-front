import {
  CarePlanListResDto,
  CarePlanResDto,
  CreateCarePlanReqDto,
  UpdateCarePlanReqDto,
} from "@/types/care-plan";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";

async function createCarePlan(data: CreateCarePlanReqDto) {
  const response = await api.post<CarePlanResDto>(
    "client/careplan_create/",
    data
  );
  return response.data;
}

export const useCarePlanCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCarePlan,
    onSuccess: () => {
      queryClient.invalidateQueries(["care-plans"]);
    },
  });
};

async function getClientCarePlans(clientId: number, params: PaginationParams) {
  const response = await api.get<CarePlanListResDto>(
    `client/careplan_list/${clientId}`,
    {
      params,
    }
  );
  return response.data;
}

export const useClientCarePlans = (clientId: number) => {
  const pagination = usePaginationParams();
  const query = useQuery(
    ["care-plans", "clients", clientId],
    () => getClientCarePlans(clientId, pagination.params),
    {
      enabled: !!clientId,
    }
  );
  return {
    ...query,
    pagination,
  };
};

async function getCarePlan(planId: number) {
  const response = await api.get<CarePlanResDto>(
    `client/careplan_rud/${planId}/`
  );
  return response.data;
}

export const useCarePlan = (planId: number) => {
  return useQuery(["care-plans", planId], () => getCarePlan(planId));
};

async function patchCarePlan(planId: number, data: UpdateCarePlanReqDto) {
  const response = await api.patch<CarePlanResDto>(
    `client/careplan_rud/${planId}/`,
    data
  );
  return response.data;
}

export const useCarePlanPatch = (planId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCarePlanReqDto) => patchCarePlan(planId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["care-plans", planId]);
    },
  });
};
