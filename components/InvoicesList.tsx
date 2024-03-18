"use client";

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
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { InvoiceItem, InvoicesResDto } from "@/types/invoices/invoices-res.dto";
import { WithPaginationResult } from "@/types/pagination-result";

async function getContractInvoices(
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

const useContractInvoices = (contractId: number) => {
  const paginationParams = usePaginationParams();
  const query = useQuery({
    queryKey: ["contracts", contractId, "invoices"],
    queryFn: () => getContractInvoices(contractId, paginationParams),
  });

  return {
    ...query,
    pagination: paginationParams,
  };
};

async function getInvoices(paginationParams?: PaginationParams) {
  const response = await api.get<InvoicesResDto>("/client/invoice_all/", {
    params: paginationParams,
  });
  return response.data;
}

const useInvoices = () => {
  const paginationParams = usePaginationParams();
  const query = useQuery({
    queryKey: ["invoices", paginationParams],
    queryFn: () => getInvoices(paginationParams),
  });

  return {
    ...query,
    pagination: paginationParams,
  };
};

export function AllInvoicesList() {
  const invoicesQuery = useInvoices();
  return <InvoicesList queryResult={invoicesQuery} />;
}

export function InvoicesList(props: {
  queryResult: WithPaginationResult<UseQueryResult<InvoicesResDto>>;
}) {
  const { data, isLoading, pagination } = props.queryResult;
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
            href={data.row.original.url}
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
