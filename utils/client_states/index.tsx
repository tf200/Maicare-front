import {
  ClientStateListResDto,
  ClientStateReqDto,
  ClientStateResDto,
  UpdateClientStateReqDto,
} from "@/types/client_states";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";

async function createClientState(clientId: number, data: ClientStateReqDto) {
  const response = await api.post<ClientStateResDto>(
    `/clients/states/add`,
    data
  );
  return response.data;
}

export const useCreateClientState = (clientId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ClientStateReqDto) => createClientState(clientId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["clientStates", clientId]);
      },
    }
  );
};

async function getClientStates(clientId: number, params?: PaginationParams) {
  const response = await api.get<ClientStateListResDto>(
    `/clients/${clientId}/states`
  );
  return response.data;
}

export const useClientStates = (clientId: number) => {
  const pagination = usePaginationParams();
  const query = useQuery(["clientStates", clientId, pagination.params], () =>
    getClientStates(clientId, pagination.params)
  );
  return {
    ...query,
    pagination,
  };
};

async function updateClientState(
  stateId: number,
  data: UpdateClientStateReqDto
) {
  const response = await api.patch<ClientStateResDto>(
    `/clients/states/${stateId}/update`,
    data
  );
  return response.data;
}

export const useUpdateClientState = (stateId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: UpdateClientStateReqDto) => updateClientState(stateId, data),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(["clientStates", res.client_id]);
      },
    }
  );
};

async function deleteClientState(stateId: number) {
  const response = await api.delete<ClientStateResDto>(
    `/clients/states/${stateId}/delete`
  );
  return response.data;
}

export const useDeleteClientState = () => {
  const queryClient = useQueryClient();

  return useMutation((stateId: number) => deleteClientState(stateId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["clientStates"]);
    },
  });
};
