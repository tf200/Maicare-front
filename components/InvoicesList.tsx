import { ContractResDto } from "@/types/contracts/contract-res.dto";
import React, { useMemo } from "react";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { ColumnDef } from "@tanstack/react-table";
import { dateFormat } from "@/utils/timeFormatting";
import { formatPrice } from "@/utils/priceFormatting";
import Loader from "@/components/common/Loader";
import PaginatedTable from "@/components/PaginatedTable";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { usePaginationParams } from "@/hooks/usePaginationParams";

type GenerateInvoiceReqDto = {
  start_date: string;
  end_date: string;
  contract_id: number;
};

type GenerateInvoiceResDto = {
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

async function generateInvoice(req: GenerateInvoiceReqDto) {
  const response = await api.post<GenerateInvoiceResDto>(
    "/client/generate-invoice/",
    req
  );
  return response.data;
}

const useGenerateInvoice = (contractId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateInvoice,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["contracts", contractId, "invoices"]);
    },
  });
};

export function GenerateInvoice(props: { contractData: ContractResDto }) {
  const { mutate: generate, isLoading } = useGenerateInvoice(
    props.contractData.id
  );
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [invoiceURL, setInvoiceURL] = React.useState("");
  return (
    <div className="flex gap-4 items-end">
      <InputField
        label={"From"}
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <InputField
        label={"To"}
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <Button
        isLoading={isLoading}
        disabled={!from || !to}
        onClick={() => {
          setInvoiceURL("");
          generate(
            {
              start_date: from,
              end_date: to,
              contract_id: props.contractData.id,
            },
            {
              onSuccess: (data) => {
                console.log(data.pdf_url);
                setInvoiceURL(data.pdf_url);
              },
            }
          );
        }}
      >
        Generate Invoice
      </Button>
      {invoiceURL && (
        <a
          href={invoiceURL}
          target="_blank"
          className="text-primary hover:underline px-10 py-3"
        >
          <DownloadIcon className="inline-block mr-5" /> Download Invoice
        </a>
      )}
    </div>
  );
}

type InvoiceItem = GenerateInvoiceResDto;
type InvoicesResDto = Paginated<InvoiceItem>;

async function getInvoice(
  contractId: number,
  paginationParams?: PaginationParams
) {
  const response = await api.get<InvoicesResDto>(
    `/client/invoices/${contractId}`,
    {
      params: paginationParams,
    }
  );
  return response.data;
}

const useInvoices = (contractId: number) => {
  const paginationParams = usePaginationParams();
  const query = useQuery({
    queryKey: ["contracts", contractId, "invoices"],
    queryFn: () => getInvoice(contractId, paginationParams),
  });

  return {
    ...query,
    pagination: paginationParams,
  };
};

export function InvoicesList(props: { contractData: ContractResDto }) {
  const { data, isLoading, pagination } = useInvoices(props.contractData.id);
  const columns = useMemo<ColumnDef<InvoiceItem>[]>(() => {
    return [
      {
        accessorKey: "invoice_number",
        header: "Invoice Number",
        cell: (data) => data.getValue() as string,
      },
      {
        accessorKey: "issue_date",
        header: "Issue Date",
        cell: (data) => dateFormat(data.getValue() as string),
      },
      {
        accessorKey: "due_date",
        header: "Due Date",
        cell: (data) => dateFormat(data.getValue() as string),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (data) => data.getValue() as string,
      },
      {
        accessorKey: "total_amount",
        header: "Total Amount",
        cell: (data) => formatPrice(parseFloat(data.getValue() as string)),
      },
      {
        id: "download",
        header: "Download",
        cell: (data) => (
          <a
            href={data.row.original.pdf_url}
            target="_blank"
            className="text-primary hover:underline"
          >
            <DownloadIcon />
          </a>
        ),
      },
    ];
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>No data found</div>;
  }
  if (data) {
    return (
      <div>
        <PaginatedTable
          data={data}
          columns={columns}
          onPageChange={pagination.setPage}
          page={pagination.page}
        />
      </div>
    );
  }
}
