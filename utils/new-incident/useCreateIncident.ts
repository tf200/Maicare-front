import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export const createIncidentFunc = async (params) => {
  const response = await api.post("/client/incidents/add", params);
  return response;
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
