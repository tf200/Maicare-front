import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteAppointment(id: number) {
  const response = await api.delete(`appointments/rud/${id}/`);
  return response.data;
}

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
  });
};
