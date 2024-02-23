import { UpdateAppointmentReqDto } from "@/types/appointments/update-appointment-req.dto";
import api from "@/utils/api";
import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";
import { useMutation, useQueryClient } from "react-query";

async function updateAppointment(data: UpdateAppointmentReqDto) {
  const response = await api.patch<AppointmentResDto>(
    `appointments/patch/${data.id}/`,
    data
  );
  return response.data;
}

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
  });
};
