import api from "@/utils/api";
import { UpdateCertifDto } from "@/types/certificates/update-certif.dto";
import { CertifResDto } from "@/types/certificates/certif-res.dto";
import { useMutation, useQueryClient } from "react-query";

async function updateCertificate(data: UpdateCertifDto) {
  const response = await api.patch<CertifResDto>(`employee/certificationsRUD/${data.id}/`, data);
  return response.data;
}

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCertificate,
    onSuccess: (response) => {
      queryClient.invalidateQueries(["employees", response.employee, "certificates"]);
    },
  });
};
