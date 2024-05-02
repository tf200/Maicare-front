"use client";

import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  InputHTMLAttributes,
  useEffect,
  useMemo,
} from "react";
import Panel from "@/components/Panel";
import { FormikProvider, useField, useFormik, useFormikContext } from "formik";
import Button from "@/components/buttons/Button";
import {
  INVOICE_STATUS_GRAPH,
  PAYMENT_TYPE_OPTIONS,
  PAYMENT_TYPE_RECORD,
} from "@/consts";
import Select from "@/components/FormFields/Select";
import DetailCell from "@/components/DetailCell";
import InputField from "@/components/FormFields/InputField";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import {
  useAddPaymentHistory,
  useInvoice,
  useInvoiceDownloadLink,
  usePatchInvoice,
  useUpdateInvoice,
} from "@/utils/invoices";
import {
  InvoiceDetailsDto,
  InvoiceFormType,
  UpdateInvoiceDto,
} from "@/types/invoices";
import Loader from "@/components/common/Loader";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import { useClientContact } from "@/components/clientDetails/ContactSummary";
import ContactAssignment from "@/components/ContactAssignment";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import { useModal } from "@/components/providers/ModalProvider";
import * as Yup from "yup";
import { InvoiceType } from "@/types/InvoiceStatus";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { InvoiceStatus } from "@/components/invoiceStatus";
import { fullDateTimeFormat } from "@/utils/timeFormatting";
import GrayBox from "@/components/GrayBox";
import { formatPrice } from "@/utils/priceFormatting";
import Link from "next/link";
import LinkButton from "@/components/buttons/LinkButton";
import Textarea from "@/components/FormFields/Textarea";

const invoice: InvoiceFormType = {
  items: [
    {
      care_type: "",
      contract: undefined,
      pre_vat_total: undefined,
      vat_rate: undefined,
    },
  ],
  pre_vat_total: "",
  total_amount: "",
};

function formToDto(values: InvoiceFormType): UpdateInvoiceDto {
  return {
    extra_content: values.extra_content,
    invoice_details: values.items.map((item) => ({
      contract_id: item.contract,
      used_tax: Number(item.vat_rate),
      item_desc: item.care_type,
      contract_amount:
        Number(item.pre_vat_total) * (1 + Number(item.vat_rate) / 100),
      contract_amount_without_tax: Number(item.pre_vat_total),
    })),
  };
}

const Page: FunctionComponent<{
  params: { invoiceId: string };
}> = ({ params: { invoiceId } }) => {
  const { data, isLoading: isLoadingInvoices } = useInvoice(+invoiceId);
  const { mutate: updateInvoice, isLoading } = useUpdateInvoice(+invoiceId);
  const initialValues = useMemo(() => {
    return {
      ...invoice,
      extra_content: data?.extra_content ?? "",
      items:
        data?.invoice_details?.map((item) => ({
          care_type: item.item_desc,
          contract: item.contract_id,
          pre_vat_total: item.contract_amount_without_tax + "",
          vat_rate: item.used_tax + "",
        })) ?? [],
    };
  }, [data]);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateInvoice(formToDto(values));
    },
  });
  const { handleSubmit, values } = formik;

  useEffect(() => {
    const preVatTotal = values.items.reduce((acc, item) => {
      return acc + Number(item.pre_vat_total ?? 0);
    }, 0);
    formik.setFieldValue("pre_vat_total", preVatTotal.toFixed(2));
    const total = values.items.reduce((acc, item) => {
      return (
        acc +
        Number(item.pre_vat_total ?? 0) * (1 + Number(item.vat_rate ?? 0) / 100)
      );
    }, 0);
    formik.setFieldValue("total_amount", total.toFixed(2));
  }, [values.items]);

  const { open: manageStatus } = useModal(ManageStatusModal);
  const {
    data: generatedInvoice,
    refetch: generate,
    isLoading: isGenerating,
  } = useInvoiceDownloadLink(data?.id);

  if (isLoadingInvoices) {
    return <Loader />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <Panel
      title={"Factuur"}
      header={
        <div className="flex items-center w-full gap-4">
          <h2 className="font-medium text-black dark:text-white">
            Factuur #{data?.invoice_number}{" "}
          </h2>
          <InvoiceStatus status={data.status} />
          {data.status !== "paid" && data.status !== "expired" && (
            <Button className="ml-auto" onClick={() => manageStatus({ data })}>
              Status bijwerken
            </Button>
          )}
        </div>
      }
    >
      <div className="px-6 py-4 border-b-1 border-stroke dark:border-strokedark">
        <ClientDetails clientId={data.client_id} />
      </div>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <strong>Factuurartikelen</strong>
          <br />
          <PricingTable disabled={data.status !== "concept"} />
          {data.status === "concept" && (
            <Textarea
              label={"Opmerkingen"}
              name={"extra_content"}
              rows={6}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.extra_content}
              className="w-full xl:w-1/2"
            />
          )}
          {data.status === "concept" && (
            <div className="flex my-5 mr-5 justify-end">
              <Button
                isLoading={isLoading}
                disabled={isLoading || data.status !== "concept"}
                formNoValidate={true}
                type="submit"
              >
                Verzenden
              </Button>
            </div>
          )}
        </form>
      </FormikProvider>
      {data.history.length > 0 && (
        <div className="px-6 py-4 border-t-1 border-stroke dark:border-strokedark">
          <InvoiceHistory history={data.history} />
        </div>
      )}
      <div className="flex px-6 py-4 border-t-1 mt-6 border-stroke dark:border-strokedark w-full">
        <Button
          onClick={() => {
            generate();
          }}
          isLoading={isGenerating}
          className="flex gap-4 items-center ml-auto"
        >
          {generatedInvoice ? (
            <span>Factuur gegenereerd</span>
          ) : (
            <span>Genereer factuur</span>
          )}
        </Button>
        {generatedInvoice && (
          <Link
            href={generatedInvoice.download_link}
            target={"_blank"}
            className="flex gap-4 items-center ml-auto bg-primary text-white px-4 py-3 rounded-md hover:bg-primary-dark"
          >
            <DownloadIcon />
            <span>Download factuur</span>
          </Link>
        )}
      </div>
    </Panel>
  );
};

const InvoiceHistory: FunctionComponent<{
  history: InvoiceDetailsDto["history"];
}> = ({ history }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">
        Betalingsgeschiedenis van facturen:
      </h3>
      <div className="grid grid-cols-3 gap-y-4">
        {history.map((item) => (
          <div key={item.id} className="contents">
            <DetailCell
              value={fullDateTimeFormat(item.created)}
              label={"Datum"}
              className="border-b-1 border-gray pb-5"
              ignoreIfEmpty={true}
            />
            <DetailCell
              className="border-b-1 border-gray pb-5"
              value={PAYMENT_TYPE_RECORD[item.payment_method]}
              label={"Betaalmethode"}
              ignoreIfEmpty={true}
            />
            <DetailCell
              className="border-b-1 border-gray pb-5"
              value={formatPrice(item.amount)}
              label={"Betaald bedrag"}
              ignoreIfEmpty={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const UpdateStatus: FunctionComponent<{
  invoice: InvoiceDetailsDto;
  onSuccess?: () => void;
}> = ({ invoice, onSuccess }) => {
  const { mutate: updateStatus, isLoading } = usePatchInvoice(invoice.id);
  const { mutate: addPaymentHistory } = useAddPaymentHistory(invoice.id);
  const { handleSubmit, handleChange, touched, errors, handleBlur, values } =
    useFormik({
      initialValues: {
        status: "",
        payment_method: "",
        amount: "",
      },
      validationSchema: Yup.object().shape({
        status: Yup.string().required(),
        payment_method: Yup.string().when("status", (value, schema) => {
          if (
            value[0] === "partially_paid" ||
            value[0] === "overpaid" ||
            value[0] === "paid"
          ) {
            return schema.required("Dit veld is verplicht");
          }
          return schema;
        }),
        amount: Yup.string().when("status", (value, schema) => {
          if (value[0] === "partially_paid" || value[0] === "overpaid") {
            return schema.required("Dit veld is verplicht");
          }
          return schema;
        }),
      }),
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        if (
          values.status === "partially_paid" ||
          values.status === "overpaid" ||
          values.status === "paid"
        ) {
          addPaymentHistory(
            {
              payment_method: values.payment_method,
              amount: Number(values.amount),
              invoice_status: values.status as InvoiceType,
            },
            {
              onSuccess: () => {
                resetForm();
                onSuccess?.();
              },
            }
          );
        } else {
          updateStatus(
            {
              status: values.status as InvoiceType,
            },
            {
              onSuccess: () => {
                resetForm();
                onSuccess?.();
              },
            }
          );
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} className={"flex flex-col"}>
      <DetailCell
        className="mb-6"
        label={"Huidige status"}
        value={
          <div className="mt-2">
            <InvoiceStatus status={invoice.status} />
          </div>
        }
      />
      <DetailCell
        label={"Status bijwerken"}
        value={
          <div className="mt-2 mb-5">
            <Select
              label={"Factuur status"}
              value={values.status}
              options={INVOICE_STATUS_GRAPH[invoice.status]}
              name={"status"}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.status && errors.status}
            />
          </div>
        }
      />
      {(values.status === "paid" ||
        values.status === "partially_paid" ||
        values.status === "overpaid") && (
        <Select
          options={PAYMENT_TYPE_OPTIONS}
          name={"payment_method"}
          label={"Betaalmethode"}
          className="mb-4"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.payment_method}
          error={touched.payment_method && errors.payment_method}
        />
      )}
      {(values.status === "partially_paid" ||
        values.status === "overpaid" ||
        values.status === "paid") && (
        <InputField
          name={"amount"}
          type={"number"}
          step={"0.01"}
          isPrice={true}
          max={
            values.status === "partially_paid"
              ? invoice.total_amount
              : undefined
          }
          min={values.status === "overpaid" ? invoice.total_amount : 0}
          label={"Betaald bedrag"}
          placeholder={"Betaald bedrag"}
          className="mb-4"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.amount}
          error={touched.amount && errors.amount}
        />
      )}
      <Button
        type="submit"
        formNoValidate={true}
        className="mt-8"
        isLoading={isLoading}
      >
        Status bijwerken
      </Button>
    </form>
  );
};

const ManageStatusModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  return (
    <FormModal {...props} title={"Status bijwerken"}>
      <UpdateStatus
        invoice={additionalProps.data}
        onSuccess={() => {
          props.onClose();
        }}
      />
    </FormModal>
  );
};

const ClientDetails: FunctionComponent<{
  clientId: number;
}> = ({ clientId }) => {
  const { data: client, isLoading: isLoadingClient } =
    useClientDetails(clientId);

  const { data: contact, isLoading: isLoadingContact } =
    useClientContact(clientId);
  return (
    <div className="flex flex-wrap justify-between">
      {isLoadingClient ? (
        <Loader />
      ) : (
        <GrayBox>
          <h3 className="text-l font-bold mb-4">Cliënt</h3>
          <div className="flex gap-2.5">
            <DetailCell
              label={"Naam"}
              value={`${client?.first_name} ${client?.last_name}`}
            />
            <DetailCell label={"Email"} value={client?.email} type={"email"} />
            <DetailCell
              label={"Telefoon"}
              value={client?.phone_number}
              type={"phone"}
            />
          </div>
        </GrayBox>
      )}
      {isLoadingContact ? (
        <Loader />
      ) : (
        <ContactAssignment
          clientId={clientId}
          data={contact}
          unassigned={client && !client.sender}
          text={"Opdrachtgever"}
        />
      )}
    </div>
  );
};

const PricingTable: FunctionComponent<{
  disabled?: boolean;
}> = ({ disabled }) => {
  const { values, setFieldValue } = useFormikContext<InvoiceFormType>();
  return (
    <table className="border-separate border-spacing-2.5 w-full">
      <thead>
        <tr>
          <th>Soort Hulpverlening</th>
          <th>BTW</th>
          <th>Prijs</th>
        </tr>
      </thead>
      <tbody>
        {values.items.map((item, index) => (
          <tr key={item.contract}>
            <td className="w-1/3">
              <TableInput
                disabled={!!item.contract || disabled}
                placeholder={"Zorgtype"}
                name={`items[${index}].care_type`}
              />
            </td>
            <td className="w-1/4">
              <TableInput
                disabled={disabled}
                variant={"percentage"}
                placeholder={"BTW"}
                min={0}
                type="number"
                name={`items[${index}].vat_rate`}
              />
            </td>
            <td className="w-1/4">
              <TableInput
                disabled={disabled}
                variant={"currency"}
                placeholder={"Prijs"}
                type="number"
                name={`items[${index}].pre_vat_total`}
              />
            </td>
            <td>
              <div className="flex gap-2.5">
                <ActionButton
                  disabled={disabled}
                  onClick={() => {
                    const split1 = values.items.slice(0, index + 1);
                    const split2 = values.items.slice(index + 1);
                    setFieldValue("items", [
                      ...split1,
                      { description: "", vat: "", price: "" },
                      ...split2,
                    ]);
                  }}
                >
                  <PlusIcon />
                </ActionButton>
                <ActionButton
                  disabled={values.items.length === 1 || disabled}
                  onClick={() => {
                    setFieldValue(
                      "items",
                      values.items.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <MinusIcon />
                </ActionButton>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className="border-t border-stroke">
        <tr>
          <td colSpan={2}>
            <div className="flex flex-col items-end">
              <strong>Totaal voor BTW:</strong>
            </div>
          </td>
          <td>
            <TableInput
              placeholder={"Totaal voor BTW"}
              name={"pre_vat_total"}
              variant={"currency"}
              disabled={true}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="flex flex-col items-end">
              <strong>Totaal:</strong>
            </div>
          </td>
          <td>
            <TableInput
              placeholder={"Totaal"}
              name={"total_amount"}
              variant={"currency"}
              disabled={true}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

type TableInputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: "normal" | "currency" | "percentage";
};

const TableInput: FunctionComponent<TableInputProps> = (props) => {
  const { variant = "normal" } = props;
  const field = useField({
    name: props.name,
    type: props.type,
    id: props.id,
  });
  return (
    <div className={"relative"}>
      {variant !== "normal" && (
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 pointer-events-none">
          <span className="text-bodydark2 font-semibold text-xl dark:text-white">
            {variant === "currency" ? "€" : "%"}
          </span>
        </span>
      )}
      <input
        {...props}
        {...field[0]}
        data-no-spin={variant === "percentage" || variant === "currency"}
        className="w-full rounded-sm border border-stroke bg-white py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
      />
    </div>
  );
};

export default Page;

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ActionButton: FunctionComponent<ActionButtonProps> = (props) => {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      className="flex h-12.5 w-12.5 disabled:bg-gray items-center justify-center rounded-sm border border-stroke bg-white p-4 hover:text-primary dark:border-strokedark dark:bg-boxdark"
    >
      {props.children}
    </button>
  );
};
