"use client";

import { ClientDetailsResDto } from "@/types/clients/client-details-res-dto";
import { ContractResDto } from "@/types/contracts/contract-res.dto";
import { dateFormat, fullDateFormat } from "@/utils/timeFormatting";
import {
  calculateTotalRate,
  getRate,
  rateType,
} from "@/utils/contracts/rate-utils";
import { formatPrice } from "@/utils/priceFormatting";
import React, { FunctionComponent, useMemo } from "react";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import { useContractDetails } from "@/utils/contracts/getContractDetails";
import Loader from "@/components/common/Loader";
import {
  ContactAssignment,
  WhenNotification,
} from "@/components/forms/ContractForm";
import { useClientContact } from "@/components/clientDetails/ContactSummary";
import { mapToForm } from "@/utils/contracts/mapToForm";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { ColumnDef } from "@tanstack/react-table";
import PaginatedTable from "@/components/PaginatedTable";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { PaginationParams } from "@/types/pagination-params";

type Props = {
  clientId: number;
  contractId: number;
};

const ContractDetails: FunctionComponent<Props> = ({
  clientId,
  contractId,
}) => {
  const { data: client, isLoading: isClientLoading } =
    useClientDetails(clientId);
  const { data: contract, isLoading: isContractLoading } = useContractDetails(
    clientId,
    contractId
  );
  const { data: contactData } = useClientContact(clientId);
  return (
    <div
      id="contract"
      className="rounded-sm bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9"
    >
      {isClientLoading && isContractLoading && <Loader />}
      {client && <ClientData clientData={client} contractId={contractId} />}
      <div className="flex items-start justify-between mt-5">
        {contactData && (
          <ContactAssignment clientId={clientId} data={contactData} />
        )}
        {contract && <WhenNotification values={mapToForm(contract)} />}
      </div>
      {contract && <ContractData contractData={contract} />}
      {contract && <GenerateInvoice contractData={contract} />}
      {contract && (
        <div className="mt-10 -ml-9 -mr-9">
          <h3 className="mb-5 ml-8 text-2xl font-semibold text-black dark:text-white">
            Invoices
          </h3>
          <InvoiceList contractData={contract} />
        </div>
      )}
    </div>
  );
};

export default ContractDetails;

function ClientData(props: {
  clientData: ClientDetailsResDto;
  contractId: number;
}) {
  return (
    <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row xl:gap-9">
        <div>
          <p className="mb-1.5 text-lg font-medium text-black dark:text-white">
            Client
          </p>
          <h4 className="mb-4 text-2xl font-semibold text-black dark:text-white">
            {props.clientData.first_name} {props.clientData.last_name}
          </h4>
          <a href={`mailto:${props.clientData.email}`} className="block">
            <span className="font-medium">Email:</span> {props.clientData.email}
          </a>
          <span className="mt-2 block">
            <span className="font-medium">Location:</span>{" "}
            {props.clientData.location}
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-black dark:text-white">
        Contract #{props.contractId}
      </h3>
    </div>
  );
}

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

function GenerateInvoice(props: { contractData: ContractResDto }) {
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

function InvoiceList(props: { contractData: ContractResDto }) {
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

function ContractData(props: { contractData: ContractResDto }) {
  return (
    <div className="my-10 rounded-sm border border-stroke p-5 dark:border-strokedark">
      <div className="items-center sm:flex">
        <div className="w-full items-center justify-between md:flex">
          <div className="mb-3 md:mb-0">
            <span className="inline-block font-medium text-black hover:text-primary dark:text-white">
              {props.contractData.care_type}
            </span>
            <p className="flex text-sm font-medium">
              <span className="mr-5">
                {" "}
                From: {fullDateFormat(props.contractData.start_date)}{" "}
              </span>
              <span className="mr-5">
                {" "}
                Zorgperiode: {props.contractData.duration_client} maanden{" "}
              </span>
            </p>
          </div>
          <div className="flex items-center md:justify-end">
            <p className="mr-20 font-semibold text-black dark:text-white">
              Rate: {rateType(props.contractData)}
            </p>
            <p className="mr-5 font-semibold text-black dark:text-white">
              {getRate(props.contractData)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentDetails(props: { item: ContractResDto }) {
  return (
    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4 sm:w-1/2 xl:w-3/12">
        <div className="mb-10">
          <h4 className="mb-4 text-xl font-semibold text-black dark:text-white md:text-2xl">
            Total Payed
          </h4>
          <p>{formatPrice(0)}</p>
        </div>
      </div>
      <div className="w-full px-4 sm:w-1/2 xl:w-3/12">
        <div className="mb-10">
          <h4 className="mb-4 text-xl font-semibold text-black dark:text-white md:text-2xl">
            Left to Pay
          </h4>
          <p>{calculateTotalRate(props.item)}</p>
        </div>
      </div>
      <div className="w-full px-4 xl:w-6/12">
        <div className="mr-10 text-right md:ml-auto">
          <div className="ml-auto sm:w-1/2">
            <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
              <span> Subtotal </span>
              <span> {calculateTotalRate(props.item)} </span>
            </p>
            <p className="mb-4 flex justify-between font-medium text-black dark:text-white">
              <span> Insurance (-) </span>
              <span> {formatPrice(0)} </span>
            </p>
            <p className="mb-4 mt-2 flex justify-between border-t border-stroke pt-6 font-medium text-black dark:border-strokedark dark:text-white">
              <span> Total Payable </span>
              <span> {calculateTotalRate(props.item)} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
