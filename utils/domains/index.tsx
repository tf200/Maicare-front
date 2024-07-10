import { DomainLevels, DomainsList, MDomain, MDomainFormType } from "@/types/domains";
import api from "@/utils/api";
import { QueryClient, useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { useCallback, useMemo } from "react";
import { SetDomainLevelReqDto } from "@/types/goals";
import { Prettify } from "@/types";
import { get } from "http";

async function createDomain(domain: MDomainFormType) {
  const response = await api.post<MDomain>("/assessments/domains/add", domain);
  return response.data;
}

export const useCreateDomain = () => {
  const queryClient = useQueryClient();
  return useMutation(createDomain, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["domains"]);
    },
  });
};

async function getDomains() {
  const response = await api.get<DomainsList>("/assessments/domains");
  return response.data;
}

export const useDomains = () => {
  return useQuery(["domains"], getDomains);
};

async function getClientDomains(clientId: number) {
  const response = await api.get<number[]>(`/clients/${clientId}/domains`);
  return response.data;
}

export const useClientDomains = (clientId: number) => {
  const queryClient = useQueryClient();
  return useQuery(["client_domains", clientId], async () => {
    const domainIds = await getClientDomains(clientId);
    return await getClientDomainsByIds(queryClient, clientId, domainIds);
  });
};

/**
 * Get list of domain details by their ids
 * @param queryClient
 * @param planId
 * @param ids
 */
export async function getDomainsByIds(queryClient: QueryClient, planId: number, ids: number[]) {
  const domains = await queryClient.fetchQuery<MDomain[]>(["domains"], getDomains);
  return queryClient.fetchQuery(["care_plan", planId, "domains", ids], {
    queryFn: () => domains.filter((d) => ids.includes(d.id)),
  });
}

export async function getClientDomainsByIds(
  queryClient: QueryClient,
  clientId: number,
  ids: number[]
) {
  const domains = await queryClient.fetchQuery<MDomain[]>(["domains"], getDomains);
  return queryClient.fetchQuery(["clients", clientId, "domains", ids], {
    queryFn: () => domains.filter((d) => ids.includes(d.id)),
  });
}

export const useGetDomain = (domainId: number) => {
  const queryClient = useQueryClient();
  return useQuery(["domain", domainId], async () => {
    const domains = await getDomainsByIds(queryClient, 0, [domainId]);
    return domains[0];
  });
};

async function getClientLevels(clientId: number) {
  const response = await api.get<DomainLevels>(`/clients/${clientId}/current-levels`);
  return response.data;
}

export const useClientLevels = (clientId: number) => {
  return useQuery(["client_levels", clientId], () => getClientLevels(clientId));
};

export type selectedAssessment = Prettify<
  SetDomainLevelReqDto & {
    goal_ids: number[];
  }
>;

export type selectedAssessmentDto = {
  domain_id: number;
  level: number;
  goal_ids: number[];
};

async function getClientSelectedAssessments(domainId: number, levelId: number) {
  const response = await api.get<selectedAssessmentDto>(
    `/clients/maturity-matrix/selected-assessments/${domainId}/${levelId}`
  );
  return response.data;
}

export function useClientSelectedAssessments(domainId: number, levelId: number) {
  return useQuery(["client_selected_assessments", domainId, levelId], () =>
    getClientSelectedAssessments(domainId, levelId)
  );
}

export type MaturityMatrixPayload = {
  client_id: number;
  start_date: string;
  end_date: string;
  maturity_matrix: selectedAssessmentDto[];
};

async function createMaturityMatrix(payload: MaturityMatrixPayload) {
  const req = await api.post("/clients/questionnaires/maturity-matrices/add", payload);
  return req.data;
}

export function useCreateMaturityMatrix() {
  const queryClient = useQueryClient();
  return useMutation(createMaturityMatrix, {
    onSuccess: () => {
      queryClient.invalidateQueries(["maturity_matrix_list"]);
    },
  });
}

/*
Maturity Mattrix Response
{
    "client_id": 44,
    "selected_assessments": [
        {
            "assessment_id": 226,
            "domain_id": 53,
            "level": 1,
            "maturitymatrix_id": 7,
            "goals": [
                {
                    "domain_id": 53,
                    "client_id": 44,
                    "objectives": [
                        {
                            "goal_id": 48,
                            "client_id": 44,
                            "id": 93,
                            "title": "Verhoog de omzet met 15% om de complexe schulden te verminderen",
                            "desc": "\ud83d\udd39 Measurable: Omzetgroei meten aan het einde van elk kwartaal\n\n\ud83d\udd39 Achievable: Door het implementeren van nieuwe verkoopstrategie\u00ebn en het aantrekken van nieuwe klanten\n\n\ud83d\udd39 Relevant: Om de financi\u00eble positie van het bedrijf te versterken en de complexe schulden te verminderen\n\n\ud83d\udd39 Time bound: Binnen 12 maanden na implementatie van de nieuwe strategie\u00ebn",
                            "rating": 0.0,
                            "updated": "2024-07-08T15:43:30.282",
                            "created": "2024-07-08T15:43:30.282"
                        },
                        {
                            "goal_id": 48,
                            "client_id": 44,
                            "id": 94,
                            "title": "Verminder de operationele kosten met 10% om de winstgevendheid te verhogen",
                            "desc": "\ud83d\udd39 Measurable: Maandelijkse controle van operationele kosten en vergelijking met voorgaande periodes\n\n\ud83d\udd39 Achievable: Door het identificeren van ineffici\u00ebnties en het optimaliseren van processen\n\n\ud83d\udd39 Relevant: Om de financi\u00eble gezondheid van het bedrijf te verbeteren en ruimte te cre\u00ebren voor investeringen\n\n\ud83d\udd39 Time bound: Binnen 6 maanden na het starten van het kostenoptimalisatieprogramma",
                            "rating": 0.0,
                            "updated": "2024-07-08T15:43:31.282",
                            "created": "2024-07-08T15:43:31.282"
                        },
                        {
                            "goal_id": 48,
                            "client_id": 44,
                            "id": 95,
                            "title": "Verhoog de liquiditeit van het bedrijf door het verkorten van de gemiddelde debiteurentermijn met 20 dagen",
                            "desc": "\ud83d\udd39 Measurable: Dagelijkse monitoring van debiteurentermijnen en bijhouden van gemiddelde termijn\n\n\ud83d\udd39 Achievable: Door het verbeteren van het debiteurenbeheer en het implementeren van striktere betalingsvoorwaarden\n\n\ud83d\udd39 Relevant: Om de cashflow te verbeteren en de financi\u00eble stabiliteit te waarborgen\n\n\ud83d\udd39 Time bound: Binnen 9 maanden na de invoering van de nieuwe betalingsvoorwaarden",
                            "rating": 0.0,
                            "updated": "2024-07-08T15:43:32.280",
                            "created": "2024-07-08T15:43:32.280"
                        }
                    ],
                    "main_goal_rating": 0.0,
                    "created_by_id": null,
                    "reviewed_by_id": null,
                    "created_by_name": null,
                    "reviewed_by_name": null,
                    "id": 48,
                    "title": "groeiende complexe schulden",
                    "desc": "",
                    "selected_maturity_matrix_assessment": 7,
                    "is_approved": false,
                    "updated": "2024-07-08T15:43:32.889",
                    "created": "2024-07-08T15:43:29.893"
                }
            ],
            "id": 7,
            "updated": "2024-07-08T15:45:32.773",
            "created": "2024-07-08T15:45:32.773"
        }
    ],
    "id": 7,
    "start_date": "2024-07-08",
    "end_date": "2024-07-31",
    "is_approved": false,
    "updated": "2024-07-08T15:45:32.031",
    "created": "2024-07-08T15:45:32.031"
}*/

// There is a difference between "SelectedAssessmentDto" and "selectedAssessmentDto"
export type SelectedAssessmentDto = {
  id: number;
  assessment_id: number;
  domain_id: number;
  level: number;
  maturitymatrix_id: number;
  goals: {
    domain_id: number;
    client_id: number;
    main_goal_rating: number;
    created_by_id: number | null;
    reviewed_by_id: number | null;
    created_by_name: string | null;
    reviewed_by_name: string | null;
    id: number;
    title: string;
    desc: string;
  }[];
};

// Response Dto type
export type MaturityMatrixDto = {
  id: number;
  client_id: number;
  start_date: string;
  end_date: string;
  is_approved: boolean;
  updated: string;
  created: string;
  selected_assessments: SelectedAssessmentDto[];
};

async function getClientMaturityMatrixList(clientId: number) {
  const response = await api.get<MaturityMatrixDto[]>(
    `/clients/${clientId}/questionnaires/maturity-matrices`
  );
  return response.data;
}

export function useMaturityMatrixList(clientId: number) {
  return useQuery(["maturity_matrix_list"], () => getClientMaturityMatrixList(clientId));
}

async function getMaturityMatrixDetails(matrixId: number) {
  const response = await api.get<MaturityMatrixDto>(
    `/clients/questionnaires/maturity-matrices/${matrixId}/details`
  );
  return response.data;
}

export function useMaturityMatrixDetails(matrixId: number) {
  return useQuery(["maturity_matrix_details", matrixId], () => getMaturityMatrixDetails(matrixId));
}

async function updateMaturityMatrix(matrixId: number, payload: MaturityMatrixPayload) {
  const response = await api.put<MaturityMatrixDto>(
    `/clients/questionnaires/maturity-matrices/${matrixId}/update`,
    payload
  );
  return response.data;
}

export function useUpdateMaturityMatrix(matrixId: number) {
  const queryClient = useQueryClient();
  return useMutation((payload: MaturityMatrixPayload) => updateMaturityMatrix(matrixId, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(["maturity_matrix_list"]);
      queryClient.invalidateQueries(["maturity_matrix_details", matrixId]);
    },
  });
}

async function getSelectedAssessmentByGoalId(goalId: number) {
  const response = await api.get<SelectedAssessmentDto>(
    `/clients/questionnaires/maturity-matrices/selected-assessments-by-goal-id/${goalId}`
  );
  return response.data;
}

export function useGetSelectedAssessmentByGoalId(goalId: number) {
  return useQuery(["selected_assessment", goalId], () => getSelectedAssessmentByGoalId(goalId));
}
