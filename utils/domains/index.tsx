import { DomainLevels, DomainsList, MDomain, MDomainFormType } from "@/types/domains";
import api from "@/utils/api";
import { QueryClient, useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { useCallback, useMemo } from "react";
import { SetDomainLevelReqDto } from "@/types/goals";
import { Prettify } from "@/types";

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
