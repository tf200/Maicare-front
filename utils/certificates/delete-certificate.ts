import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function deleteCertificate(certificateId: number) {
  const response = await api.delete(
    `employee/certificationsRUD/${certificateId}/`
  );
  return response.data;
}

export const useDeleteCertificate = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees", clientId, "certificates"]);
    },
  });
};
