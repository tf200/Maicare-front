import api from "@/utils/api";
import { AppointmentListResDto } from "@/types/appointments/appointments-res.dto";
import { useQuery } from "react-query";
import { AppointmentSearchParams } from "@/types/appointments";
import { cleanQueryParams } from "@/utils/cleanQueryParams";

async function listAppointments(params?: AppointmentSearchParams) {
  const response = await api.get<AppointmentListResDto>("appointments/list/", {
    params: cleanQueryParams(params),
  });
  return response.data;
}

export const useAppointmentsList = (params?: AppointmentSearchParams) => {
  return useQuery({
    queryKey: ["appointments", params],
    queryFn: () => listAppointments(params),
  });
};
