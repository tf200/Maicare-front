import api from "@/utils/api";
import { useQuery } from "react-query";
import { EmergencyContactsListResDto } from "@/types/emergencyContacts/emergency-contacts-list-res-dto";

async function getEmergencyContacts(clientId: number, numberOfItems: number) {
  const response = await api.get<EmergencyContactsListResDto>(
    `client/emergency_list/${clientId}/`,
    {
      params: {
        page: 1,
        page_size: numberOfItems,
      },
    }
  );
  return response.data;
}

export const useEmergencyContacts = (clientId: number, numberOfItems: number = 3) => {
  return useQuery({
    queryFn: () => getEmergencyContacts(clientId, numberOfItems),
    queryKey: [clientId, "emergency_contacts"],
  });
};
