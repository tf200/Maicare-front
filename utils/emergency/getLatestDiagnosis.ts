import api from "@/utils/api";
import { useQuery } from "react-query";
import { EmergencyContactsListResDto } from "@/types/emergencyContacts/emergency-contacts-list-res-dto";

async function getLatestDiagnosis(clientId: number, numberOfItems: number) {
  const response = await api.get<EmergencyContactsListResDto>(
    `client/diagnosis_list/${clientId}/`,
    {
      params: {
        page: 1,
        ordering: "-date_of_diagnosis",
        page_size: numberOfItems,
      },
    }
  );
  return response.data;
}

export const useLatestDiagnosis = (
  clientId: number,
  numberOfItems: number = 3
) => {
  return useQuery({
    queryFn: () => getLatestDiagnosis(clientId, numberOfItems),
    queryKey: [clientId, "latest_diagnosis"],
  });
};
