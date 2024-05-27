import { NewIncidentType } from "@/types/incidents/";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export const createIncidentFunc = async (params: NewIncidentType): Promise<NewIncidentType> => {
  const response = await api.post<NewIncidentType>("/clients/incidents/add", params);
  return response.data;
};

export const useCreateIncident = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIncidentFunc,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "incidents"]);
    },
  });
};
