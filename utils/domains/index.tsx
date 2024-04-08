import { DomainsList, MDomain, MDomainFormType } from "@/types/domains";
import api from "@/utils/api";
import {
  QueryClient,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "react-query";
import { useCallback, useMemo } from "react";

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

export async function getDomainsByIds(
  queryClient: QueryClient,
  planId: number,
  ids: number[]
) {
  const domains = await queryClient.fetchQuery<MDomain[]>(
    ["domains"],
    getDomains
  );
  return queryClient.fetchQuery(["care_plan", planId, "domains"], {
    queryFn: () => domains.filter((d) => ids.includes(d.id)),
  });
}
