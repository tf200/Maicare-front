import { NewObjectiveReqDto, UpdateObjectiveReqDto } from "@/types/goals";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

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
