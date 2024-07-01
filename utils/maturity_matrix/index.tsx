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
