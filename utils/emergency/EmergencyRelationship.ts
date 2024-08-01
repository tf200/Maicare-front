import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../api";

type EmergencyRelationshipListResDto = {
  id?: number;
  name: string;
};

async function getEmergencyRelationships() {
  const response = await api.get<EmergencyRelationshipListResDto[]>(
    "/clients/emergency-contacts/contact-relationships"
  );
  return response.data;
}

async function createRelationship(data: EmergencyRelationshipListResDto) {
  const response = await api.post<EmergencyRelationshipListResDto>(
    "/clients/emergency-contacts/contact-relationships/add",
    data
  );
  return response.data;
}

export function useRelationshipList() {
  return useQuery("emergency_relationships", getEmergencyRelationships);
}

export function useCreateRelationship() {
  const queryClient = useQueryClient();
  return useMutation(createRelationship, {
    onSuccess: () => {
      queryClient.invalidateQueries("emergency_relationships");
    },
  });
}

export function useDeleteRelationship() {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => api.delete(`/clients/emergency-contacts/contact-relationships/${id}/delete`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("emergency_relationships");
      },
    }
  );
}
