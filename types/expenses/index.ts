export type ExpenseFormType = {
  amount: string;
  created: string;
  desc: string;
};

export type ExpenseReqDto = {
  amount: number;
  created: string;
  desc: string;
};

export type PatchExpenseReqDto = Partial<ExpenseReqDto>;

export type ExpenseResDto = {
  id: number;
  amount: number;
  created: string;
  desc: string;
};

export type ExpenseListResDto = Paginated<ExpenseResDto>;
