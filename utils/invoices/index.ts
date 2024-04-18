import { useMutation, useQueryClient } from "react-query";
import { GenerateInvoiceReqDto } from "@/types/invoices/generate-invoice.req.dto";
import api from "@/utils/api";
import { InvoiceResDto } from "@/types/invoices/invoices-res.dto";

async function generateInvoice(req: GenerateInvoiceReqDto) {
  const response = await api.post<InvoiceResDto>(
    "/client/generate-invoice/",
    req
  );
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
