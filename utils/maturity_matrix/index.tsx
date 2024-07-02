import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../api";
import { CarePlanResDto } from "@/types/care-plan";

// type MaturityMatrixResDto = CarePlanResDto;

// async function getMaturityMatrix(id: number) {
//   const response = await api.get<MaturityMatrixResDto>(`client/maturity_matrix/${id}`);
//   return response.data;
// }

// export function useMaturityMatrix(id: number) {
//   return useQuery(["maturity-matrix", id], () => getMaturityMatrix(id));
// }

type DomainIds = number[];

type DomainIdsResponse = {
  domains: DomainIds;
};

async function getClientDomains(clientId: number) {
  const req = await api.get<DomainIdsResponse>(`client/${clientId}/selected-domains`);
  return req.data?.domains;
}

export function useClientMaturityMatrixDomains(clientId: number) {
  return useQuery(["maturity-matrix-domains", clientId], () => getClientDomains(clientId));
}

async function updateClientDomains(clientId: number, payload: DomainIds) {
  const req = await api.post(`/clients/${clientId}/selected-domains/update`, { domains: payload });
  return req.data;
}

export function useUpdateMaturityMatrixDomains(clientId: number) {
  const queryClient = useQueryClient();

  return useMutation((payload: DomainIds) => updateClientDomains(clientId, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(["maturity-matrix-domains", clientId]);
      queryClient.invalidateQueries([clientId]);
      queryClient.invalidateQueries(["clients", clientId]);
      queryClient.invalidateQueries(["client_levels", clientId]);
    },
  });
}

export type Objective = {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  time_bound: string;
};

export type SmartFormulaGoal = {
  goal_name: string;
  objectives: Objective[];
};

export type SmartFormulaResponse = {
  goals: SmartFormulaGoal[];
};

async function getSmartFormula(clientId: number, domainId: number, levelId: number) {
  const response = await api.post<SmartFormulaResponse>(`ai/smart-formula/${domainId}/${levelId}`);
  return response.data?.goals;
}

export function useSmartFormula(clientId: number, domainId: number, levelId: number) {
  return {
    generateSmartFormula: async () => await getSmartFormula(clientId, domainId, levelId),
  };
}
