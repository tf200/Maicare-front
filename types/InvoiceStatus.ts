import { INVOICE_STATUS_TYPES } from "@/consts";

export type InvoiceType = (typeof INVOICE_STATUS_TYPES)[number];
