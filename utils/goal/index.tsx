import {
  SetDomainLevelReqDto,
  NewObjectiveReqDto,
  RatingHistory,
  UpdateObjectiveReqDto,
} from "@/types/goals";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

async function createObjective(
  clientId: number,
  goalId: number,
  data: NewObjectiveReqDto
) {
  const response = await api.post(
    `/clients/${clientId}/goals/${goalId}/objective/add`,
    data
  );
  return response.data;
}

export const useCreateObjective = (clientId: number, goalId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NewObjectiveReqDto) => {
      return createObjective(clientId, goalId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};

async function updateObjective(objectId: number, data: UpdateObjectiveReqDto) {
  const response = await api.patch(
    `/clients/goals/objective/${objectId}/update`,
    data
  );
  return response.data;
}

export const useUpdateObjective = (clientId: number, objectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateObjectiveReqDto) => {
      return updateObjective(objectId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};

async function deleteObjective(objectiveId: number) {
  await api.delete(`/clients/goals/objective/${objectiveId}/delete`);
}

export const useDeleteObjective = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteObjective,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "goals"]);
    },
  });
};

async function getObjectiveHistory(objectiveId: number) {
  const response = await api.get<RatingHistory>(
    `/clients/goals/objectives/${objectiveId}/history`
  );
  return response.data;
}

export const useObjectiveHistory = (objectiveId: number) => {
  return useQuery({
    queryKey: ["objectives", objectiveId, "history"],
    queryFn: () => getObjectiveHistory(objectiveId),
  });
};

async function getGoalHistory(goalId: number) {
  const response = await api.get<RatingHistory>(
    `/clients/goals/${goalId}/history`
  );
  return response.data;
}

export const useGoalHistory = (goalId: number) => {
  return useQuery({
    queryKey: ["goals", goalId, "history"],
    queryFn: () => getGoalHistory(goalId),
  });
};

async function setDomainLevel(clientId: number, req: SetDomainLevelReqDto) {
  const response = await api.post(
    `/clients/${clientId}/current-levels/add`,
    req
  );
  return response.data;
}

export const useSetDomainLevel = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: SetDomainLevelReqDto) => {
      return setDomainLevel(clientId, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["client_domains", clientId]);
      queryClient.invalidateQueries(["client_levels", clientId]);
    },
  });
};

async function updateDomainLevel(levelId: number, req: SetDomainLevelReqDto) {
  const response = await api.patch(
    `/clients/current-levels/${levelId}/update`,
    req
  );
  return response.data;
}

export const useUpdateDomainLevel = (clientId: number, levelId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: SetDomainLevelReqDto) => {
      return updateDomainLevel(levelId, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["client_domains", clientId]);
      queryClient.invalidateQueries(["client_levels", clientId]);
    },
  });
};
