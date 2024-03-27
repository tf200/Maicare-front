import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const PatchIncident = async (data: any) => {
  const response = await api.patch(`employee/incidents/${data.id}/`, data);
  return response.data;
};

export const usePatchIncident = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PatchIncident,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "incidents"]);
    },
  });
};
