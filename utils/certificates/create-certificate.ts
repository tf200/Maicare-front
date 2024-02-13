import { NewCertifReqDto } from "@/types/certificates/new-certif-req.dto";
import api from "@/utils/api";
import { CertifResDto } from "@/types/certificates/certif-res.dto";
import { useMutation, useQueryClient } from "react-query";

async function createCertificate(data: NewCertifReqDto) {
  const response = await api.post<CertifResDto>(
    "employee/certifications/create/",
    data
  );
  return response.data;
}

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCertificate,
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        "employees",
        response.employee,
        "certificates",
      ]);
    },
  });
};
