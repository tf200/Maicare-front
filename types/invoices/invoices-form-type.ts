export type InvoicesFormType = {
  invoice_number: string;
  client: number;
  issue_date: string;
  due_date: string;
  pre_vat_total: number;
  vat_rate: number;
  vat_amount: number;
  total_amount: number;
};
