import { NewIncidentReqDto } from "@/types/incidents/";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export const createIncidentFunc = async (params: NewIncidentReqDto) => {
  const response = await api.post("/clients/incidents/add", params);
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
