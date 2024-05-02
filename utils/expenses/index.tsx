import {
  ExpenseListResDto,
  ExpenseReqDto,
  ExpenseResDto,
  PatchExpenseReqDto,
} from "@/types/expenses";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PaginationParams } from "@/types/pagination-params";
import { useSearchParams } from "next/navigation";
import { usePaginationParams } from "@/hooks/usePaginationParams";

async function createExpense(data: ExpenseReqDto) {
  const response = await api.post<ExpenseResDto>("/system/expenses/add", data);
  return response.data;
}

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation(createExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
    },
  });
};

async function getExpenses(params?: PaginationParams) {
  const response = await api.get<ExpenseListResDto>("/system/expenses", {
    params,
  });
  return response.data;
}

export const useGetExpenses = () => {
  const pagination = usePaginationParams();
  const query = useQuery(["expenses", pagination.params], () => getExpenses());
  return {
    ...query,
    pagination,
  };
};

async function deleteExpense(id: number) {
  await api.delete(`/system/expenses/${id}`);
}

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
    },
  });
};

async function getExpense(id: number) {
  const response = await api.get<ExpenseResDto>(`/system/expenses/${id}`);
  return response.data;
}

export const useGetExpense = (id: number) => {
  return useQuery(["expense", id], () => getExpense(id));
};

async function updateExpense(id: number, data: PatchExpenseReqDto) {
  const response = await api.patch<ExpenseResDto>(
    `/system/expenses/${id}/update`,
    data
  );
  return response.data;
}

export const useUpdateExpense = (expenseId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: PatchExpenseReqDto) => updateExpense(expenseId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses");
      },
    }
  );
};
