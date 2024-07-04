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

export type EditedSmartFormulaResponse = {
  goals: EditedSmartFormulaGoal[];
};

export type EditedSmartFormulaObjective = {
  title: string; // this is the objective title
  description: string; // this is the objective description (which includes all objectives' details)
};

export type EditedSmartFormulaGoal = {
  title: string; // this is the goal title
  objectives: EditedSmartFormulaObjective[];
};

async function _generateSmartFormula(clientId: number, domainId: number, levelId: number) {
  const response = await api.post<SmartFormulaResponse>(`ai/smart-formula/${domainId}/${levelId}`);
  return response.data?.goals;
}

async function _saveSmartFormula(
  clientId: number,
  domainId: number,
  levelId: number,
  payload: { goals: EditedSmartFormulaGoal[] }
) {
  const response = await api.post(
    `/clients/${clientId}/smart-formula/${domainId}/${levelId}/add`,
    payload
  );
  return response.data;
}

async function _getSmartFormula(clientId: number, domainId: number, levelId: number) {
  const response = await api.get<EditedSmartFormulaResponse>(
    `/clients/${clientId}/smart-formula/${domainId}/${levelId}`
  );
  return response.data?.goals;
}

export function useSmartFormula(clientId: number, domainId: number, levelId: number) {
  const queryClient = useQueryClient();

  const generateSmartFormula = async () => await _generateSmartFormula(clientId, domainId, levelId);

  const saveSmartFormula = async (payload: { goals: EditedSmartFormulaGoal[] }) => {
    await _saveSmartFormula(clientId, domainId, levelId, payload),
      queryClient.invalidateQueries(["smart-formula", clientId, domainId, levelId]);
  };

  const getSmartFormula = async () => await _getSmartFormula(clientId, domainId, levelId);

  return {
    generateSmartFormula,
    saveSmartFormula,
    getSmartFormula,
  };
}

// Get edited smart formula for a specific client, domain and level
export function useGetSmartFormula(clientId: number, domainId: number, levelId: number) {
  return useQuery(["smart-formula", clientId, domainId, levelId], () =>
    _getSmartFormula(clientId, domainId, levelId)
  );
}

// async function getAllClientSmartFormula(clientId: number) {
//   const response = await api.get<EditedSmartFormulaResponse>(`/clients/${clientId}/smart-formula`);
//   return response.data?.goals;
// }

// // Gel all editied Goals and objectives
// export function useClientSmartFormula(clientId: number) {
//   return useQuery([clientId, "all-smart-formulas"], () => getAllClientSmartFormula(clientId));
// }
