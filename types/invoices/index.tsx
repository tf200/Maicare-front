import { InvoiceType } from "@/types/InvoiceStatus";

export type InvoiceFormType = {
  items: {
    contract: number;
    vat_rate: string;
    care_type: string;
    pre_vat_total: string;
  }[];
  pre_vat_total: string;
  total_amount: string;
};

export type InvoiceDetailsDto = {
  id: number;
  client_id: number;
  issue_date: string;
  invoice_number: string;
  sender: string;
  due_date: string;
  total_amount: number;
  status: InvoiceType;
  url: string;
  payment_type: string | null;
  history: HistoryItem[];
  invoice_details: {
    contract_id: number;
    used_tax: number;
    item_desc: string;
    contract_amount: number;
    contract_amount_without_tax: number;
  }[];
};

export type UpdateInvoiceDto = Partial<Omit<InvoiceDetailsDto, "id">>;

export type AddPaymentHistoryDto = {
  payment_method: string;
  amount: number;
  invoice_status: InvoiceType;
};

export type HistoryItem = AddPaymentHistoryDto & {
  id: number;
  created: string;
  updated: string;
};
