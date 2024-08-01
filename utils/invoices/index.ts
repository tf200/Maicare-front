import { useMutation, useQuery, useQueryClient } from "react-query";
import { GenerateInvoiceReqDto } from "@/types/invoices/generate-invoice.req.dto";
import api from "@/utils/api";
import { InvoiceResDto } from "@/types/invoices/invoices-res.dto";
import {
  AddPaymentHistoryDto,
  GeneratedInvoiceDto,
  InvoiceDetailsDto,
  UpdateInvoiceDto,
} from "@/types/invoices";

async function generateInvoice(req: GenerateInvoiceReqDto) {
  const response = await api.post<InvoiceResDto>("/client/generate-invoice/", req);
  return response.data;
}

export const useGenerateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateInvoice,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

async function patchInvoice(id: number, data: Partial<InvoiceDetailsDto>) {
  const response = await api.patch(`/clients/invoices/${id}/update`, data);
  return response.data;
}

export const usePatchInvoice = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<InvoiceDetailsDto>) => patchInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices", id]);
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

const updateInvoice = (id: number) => async (data: UpdateInvoiceDto) => {
  const response = await api.patch(`/clients/invoices/${id}/update`, data);
  return response.data;
};

export const useUpdateInvoice = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices", id]);
    },
  });
};

async function getInvoice(id: number) {
  const response = await api.get<InvoiceDetailsDto>(`/clients/invoices/${id}`);
  return response.data;
}

export const useInvoice = (id: number) => {
  return useQuery(["invoices", id], () => getInvoice(id));
};

async function addPaymentHistory(invoiceId: number, data: AddPaymentHistoryDto) {
  const response = await api.post(`/clients/invoices/${invoiceId}/history/add`, data);
  return response.data;
}

export const useAddPaymentHistory = (invoiceId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddPaymentHistoryDto) => addPaymentHistory(invoiceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices", invoiceId]);
    },
  });
};

const generateInvoiceV2 = async (id: number) => {
  const response = await api.get<GeneratedInvoiceDto>(`/clients/invoices/${id}/download-link`);
  return response.data;
};

export const useInvoiceDownloadLink = (invoiceId: number) => {
  return useQuery(["generated_invoice", invoiceId], () => generateInvoiceV2(invoiceId), {
    enabled: false,
  });
};
