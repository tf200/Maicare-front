import api from "@/utils/api";
import { useQuery } from "react-query";
import { EducationListDto } from "@/types/educations";

async function listEducations(employeeId: number) {
  const response = await api.get<EducationListDto>(
    `employee/educations/${employeeId}/`
  );
  return response.data;
}

export const useListEducations = (employeeId: number) => {
  return useQuery({
    queryFn: () => listEducations(employeeId),
    queryKey: ["employees", employeeId, "educations"],
  });
};
