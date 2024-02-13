import api from "@/utils/api";
import { useQuery } from "react-query";
import { CertifListDto } from "@/types/certificates/certif-list.dto";

async function listCertificates(employeeId: number) {
  const response = await api.get<CertifListDto>(
    `employee/certifications/${employeeId}/`
  );
  return response.data;
}

export const useListCertificates = (employeeId: number) => {
  return useQuery({
    queryFn: () => listCertificates(employeeId),
    queryKey: ["employees", employeeId, "certificates"],
  });
};
