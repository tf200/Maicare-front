import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchAllergie = async (data: any) => {
  const response = await api.patch(`client/allergy_update/${data.id}/`, data);
  return response.data;
};

export const usePatchAllergie = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchAllergie,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "allergies"]);
    },
  });
};
