import api from "@/utils/api";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";



export const useUpdateYouthCareIntake = (clientId: number, youthCareIntakeId: number) => {
  const UpdateYouthCareIntake = useCallback(async (data: any) => {
    const response = await api.post(
      `/clients/questionnairs/youth-care-intakes/${data.id}/update`,
      {
        ...data,
        client: clientId
      }
    );
    return response.data;
  }, []);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateYouthCareIntake,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "youth-care-intake",youthCareIntakeId ]);
    },
  });
};
