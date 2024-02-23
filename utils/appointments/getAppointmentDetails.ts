import { useQuery } from "react-query";
import api from "@/utils/api";
import { AppointmentResDto } from "@/types/appointments/appointment-res-dto";

async function getAppointmentDetails(id: number) {
  const response = await api.get<AppointmentResDto>(`/appointments/rud/${id}/`);
  return response.data;
}

export const useAppointmentDetails = (id: number) => {
  return useQuery({
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentDetails(id),
    enabled: !!id,
  });
};
