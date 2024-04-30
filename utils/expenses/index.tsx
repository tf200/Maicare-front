import { ExpenseReqDto, ExpenseResDto } from "@/types/expenses";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

async function createExpense(data: ExpenseReqDto) {
  const response = await api.post<ExpenseResDto>("/system/expenses/add", data);
  return response.data;
}

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation(createExpense);
};
