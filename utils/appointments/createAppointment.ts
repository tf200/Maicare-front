import { NewAppointmentReqDto } from "@/types/appointments/appointment-req-dto";
import api from "@/utils/api";
import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";
import { useMutation, useQueryClient } from "react-query";

async function createAppointment(appointment: NewAppointmentReqDto) {
  const response = await api.post<AppointmentResDto>(
    "appointments/create/",
    appointment
  );
  return response.data;
}

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
    },
  });
};
