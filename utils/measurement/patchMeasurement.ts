import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchMeasurement = async (data: any) => {
  const response = await api.patch(`employee/measurment_rud/${data.id}/`, data);
  return response.data;
};

export const usePatchMeasurement = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "measurement"]);
    },
  });
};
