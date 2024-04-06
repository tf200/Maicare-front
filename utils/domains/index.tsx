import { DomainsList, MDomain, MDomainFormType } from "@/types/domains";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
