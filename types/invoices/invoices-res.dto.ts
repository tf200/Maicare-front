export type InvoiceResDto = {
  due_date: string;
  id: number;
  invoice_number: string;
  issue_date: number;
  pdf_url: string;
  pre_vat_total: string;
  status: string;
  total_amount: string;
  vat_amount: string;
  vat_rate: string;
};

export type InvoiceItem = InvoiceResDto;
export type InvoicesResDto = Paginated<InvoiceItem>;
