import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { NewIncidentReqDto } from "@/types/incidents/new-incident-req-dto";
import { IncidentsResDto } from "@/types/incidents/incident-res-dto";
import { CollaborationAgreementsType } from "@/types/questionnaire/collaboration-agreement";

async function createCollabAgreement(collab) {
  const response = await api.post<CollaborationAgreementsType>(
    "/clients/questionnairs/collaboration_agreements/add",
    collab
  );
  return response.data;
}

export const useCreateCollabAgreement = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCollabAgreement,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "collaboration-agreement"]);
    },
  });
};
