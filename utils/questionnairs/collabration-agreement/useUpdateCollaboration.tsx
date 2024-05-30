import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

const UpdateCollab = async (data: any) => {
  const response = await api.post(
    `/clients/questionnairs/collaboration_agreements/${data.id}/update`,
    data
  );
  return response.data;
};

export const useUpdateCollab = (clientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateCollab,
    onSuccess: () => {
      queryClient.invalidateQueries([clientId, "collaboration-agreement"]);
    },
  });
};
