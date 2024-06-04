import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const UpdateDataSharing = async (data: any) => {
  const response = await api.post(
    `/clients/questionnairs/data-sharing-statements/${data.id}/update`,
    data
  );
  return response.data;
};

export const useUpdateDataSharing = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateDataSharing,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "data-sharing"]);
    },
  });
};
