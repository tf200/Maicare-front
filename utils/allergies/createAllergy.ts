import { NewAllergyReqDto } from "@/types/allergies/new-allergy-req-dto";
import { AllergiesResDto } from "@/types/allergies/allergies-res-dto";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function createAllergy(allergy: NewAllergyReqDto): Promise<AllergiesResDto> {
  const response = await api.post<AllergiesResDto>("client/allergy_create/", allergy);
  return response.data;
}

export const useCreateAllergy = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAllergy,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "allergies"]);
    },
  });
};
