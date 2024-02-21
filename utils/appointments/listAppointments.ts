import api from "@/utils/api";
import { AppointmentListResDto } from "@/types/appointments/appointments-res.dto";
import { useQuery } from "react-query";

async function listAppointments() {
  const response = await api.get<AppointmentListResDto>("appointments/list/");
  return response.data;
}

export const useAppointmentsList = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: listAppointments,
  });
};
