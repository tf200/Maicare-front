import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const UpdateYouthCareIntake = async (data: any) => {
  const response = await api.post(
    `/clients/questionnaires/youth-care-intakes/${data.id}/update`,
    data
  );
  return response.data;
};

export const useUpdateYouthCareIntake = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateYouthCareIntake,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "youth-care-intake"]);
    },
  });
};
