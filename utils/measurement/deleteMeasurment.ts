import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteMeasurement(clientId: number) {
  const response = await api.delete(`employee/measurment_rud/${clientId}/`);
  return response.data;
}

export const useDeleteMeasurement = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "measurement"]);
    },
  });
};
