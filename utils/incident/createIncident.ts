import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewIncidentReqDto } from "@/types/incidents/new-incident-req-dto";
import { IncidentsResDto } from "@/types/incidents/incident-res-dto";

async function createIncident(incident: NewIncidentReqDto): Promise<IncidentsResDto> {
  const response = await api.post<IncidentsResDto>("/employee/incidents/", incident);
  return response.data;
}

export const useCreateIncident = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "incidents"]);
    },
  });
};
