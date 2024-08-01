import { NewMedicationReqDto } from "@/types/medications/new-medication-req-dto";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { MedicationsResDto } from "@/types/medications/medications-res-dto";

async function createMedication(data: NewMedicationReqDto): Promise<MedicationsResDto> {
  const response = await api.post<MedicationsResDto>("client/medication_create/", data);
  return response.data;
}

export const useCreateMedication = (clientId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMedication,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "medications"]);
    },
  });
};
