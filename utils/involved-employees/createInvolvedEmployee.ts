import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export async function createInvolvedEmployee(data: {}) {
  const response = await api.post("/employee/clientassignment_cl/", data);
  return response.data;
}

export const useCreateInvolvedEmployee = (client: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {}) => {
      return createInvolvedEmployee({
        ...data,
        client,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([client, "employees"]);
    },
  });
};
