import { InvoiceType } from "@/types/InvoiceStatus";

export type InvoiceResDto = {
  client_id: number;
  id: number;
  invoice_number: string;
  due_date: string;
  payment_method: string;
  status: InvoiceType;
  issue_date: string;
  invoice_details: {};
  total_amount: number;
  updated: string;
  created: string;
};

export type InvoiceItem = InvoiceResDto & {
  sender_name: string;
};
export type InvoicesResDto = Paginated<InvoiceItem>;
