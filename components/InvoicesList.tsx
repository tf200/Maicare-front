"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { PaginationParams } from "@/types/pagination-params";
import api from "@/utils/api";
import { ColumnDef } from "@tanstack/react-table";
import { dateFormat } from "@/utils/timeFormatting";
import { formatPrice } from "@/utils/priceFormatting";
import Loader from "@/components/common/Loader";
import PaginatedTable from "@/components/PaginatedTable";
import { useQuery, UseQueryResult } from "react-query";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { InvoiceItem, InvoicesResDto } from "@/types/invoices/invoices-res.dto";
import { WithPaginationResult } from "@/types/pagination-result";
import ClientSelector from "@/components/FormFields/comboboxes/ClientSelector";
import { FormikProvider, useFormik } from "formik";
import ContactSelector from "@/components/FormFields/comboboxes/ContactSelector";
import Button from "@/components/buttons/Button";
import Select from "@/components/FormFields/Select";
import { INVOICE_STATUS_OPTIONS, INVOICE_STATUS_RECORD } from "@/consts";
import { useRouter } from "next/navigation";
import { InvoiceStatus } from "@/components/invoiceStatus";
import { InvoiceType } from "@/types/InvoiceStatus";
import { cleanQueryParams } from "@/utils/cleanQueryParams";

async function getContractInvoices(contractId: number, paginationParams?: PaginationParams) {
  const response = await api.get<InvoicesResDto>(`/client/invoices/${contractId}`, {
    params: paginationParams,
  });
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

type InvoicesParams = PaginationParams & (FilterFormType | {});

async function getInvoices(params?: InvoicesParams) {
  const response = await api.get<InvoicesResDto>("/clients/invoices", {
    params: cleanQueryParams(params),
  });
  return response.data;
}

const useInvoices = (filter?: FilterFormType) => {
  const paginationParams = usePaginationParams();
  const query = useQuery({
    queryKey: ["invoices", { ...paginationParams.params, ...filter }],
    queryFn: () => getInvoices({ ...paginationParams.params, ...filter }),
  });

  return {
    ...query,
    pagination: paginationParams,
  };
};

export function AllInvoicesList() {
  const [filter, setFilter] = useState<FilterFormType>();
  const invoicesQuery = useInvoices(filter);

  return (
    <>
      <Filter onSubmit={setFilter} />
      <InvoicesList queryResult={invoicesQuery} />
    </>
  );
}

type FilterFormType = {
  client: number;
  sender: number;
  status: string;
};

const initialValues: FilterFormType = {
  status: "",
  client: null,
  sender: null,
};

type FilterProps = {
  onSubmit: (values: FilterFormType) => void;
};

const Filter: FunctionComponent<FilterProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  const { handleSubmit, handleReset, submitForm, handleChange, values, handleBlur } = formik;
  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4 p-4">
        <Select
          label={"Status"}
          options={INVOICE_STATUS_OPTIONS}
          name={"status"}
          className="basis-1/4 min-w-50"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.status}
        />
        <ContactSelector name={"sender"} />
        <ClientSelector name={"client"} />
        <div className="flex mt-8 gap-4">
          <Button type="submit" formNoValidate={true}>
            Zoeken
          </Button>
          <Button
            onClick={(e) => {
              handleReset(e);
              submitForm();
            }}
            buttonType={"Outline"}
          >
            Duidelijke zoek
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
};

export function InvoicesList(props: {
  queryResult: WithPaginationResult<UseQueryResult<InvoicesResDto>>;
}) {
  const { data, isLoading, pagination } = props.queryResult;
  const router = useRouter();
  const columns = useMemo<ColumnDef<InvoiceItem>[]>(() => {
    return [
      {
        accessorKey: "invoice_number",
        header: "Factuurnummer",
        cell: (data) => <span className="font-bold">{("#" + data.getValue()) as string}</span>,
      },
      {
        accessorKey: "issue_date",
        header: "Factuurdatum",
        cell: (data) => dateFormat(data.getValue() as string),
      },
      {
        accessorKey: "due_date",
        header: "Vervaldag",
        cell: (data) => dateFormat(data.getValue() as string),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (data) => <InvoiceStatus status={data.getValue() as InvoiceType} />,
      },
      {
        accessorKey: "sender_name",
        header: "Opdrachtgever",
      },
      {
        accessorKey: "total_amount",
        header: "Totaalbedrag",
        cell: (data) => formatPrice(parseFloat(data.getValue() as string)),
      },
      // {
      //   id: "download",
      //   header: "Downloaden",
      //   cell: (data) => (
      //     <a
      //       href={data.row.original.url}
      //       target="_blank"
      //       className="text-primary hover:underline"
      //       onClick={(e) => e.stopPropagation()}
      //     >
      //       <DownloadIcon />
      //     </a>
      //   ),
      // },
    ];
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>Geen gegevens gevonden</div>;
  }
  if (data) {
    return (
      <>
        <PaginatedTable
          data={data}
          columns={columns}
          onPageChange={pagination.setPage}
          page={pagination.page}
          onRowClick={(row) => router.push(`/invoices/${row.id}`)}
        />
      </>
    );
  }
}
