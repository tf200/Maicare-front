import api from "@/utils/api";
import { useQuery } from "react-query";
import { ExpListDto } from "@/types/experiences/exp-list.dto";

async function listExperiences(employeeId: number) {
  const response = await api.get<ExpListDto>(`employee/experiences/${employeeId}/`);
  return response.data;
}

export const useListExperiences = (employeeId: number) => {
  return useQuery({
    queryFn: () => listExperiences(employeeId),
    queryKey: ["employees", employeeId, "experiences"],
  });
};
