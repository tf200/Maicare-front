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
import api from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InvoiceType } from "@/types/InvoiceStatus";
import {
  INVOICE_STATUS_GRAPH,
  INVOICE_STATUS_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
} from "@/consts";
import Select from "@/components/FormFields/Select";
import ButtonsGroup from "@/components/buttons/LinksGroup";
import ToolbarButtonsGroup from "@/components/buttons/ToolbarButtonsGroup";
import DetailCell from "@/components/DetailCell";
import InputField from "@/components/FormFields/InputField";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";

type InvoiceFormType = {
  items: {
    contract: number;
    vat_rate: string;
    care_type: string;
    pre_vat_total: string;
  }[];
  pre_vat_total: string;
  total_amount: string;
};

type InvoiceDetailsDto = {
  id: number;
  full_name: string;
  sender: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  pre_vat_total: string;
  vat_rate: string;
  vat_amount: string;
  total_amount: string;
  status: InvoiceType;
  url: string;
  payment_type: string | null;
  invoice_details: {
    contract: number;
    vat_rate: number;
    care_type: string;
    vat_amount: number;
    total_amount: number;
    pre_vat_total: number;
  }[];
};

type UpdateInvoiceDto = {
  contract: number;
  vat_rate: number;
  pre_vat_total: number;
}[];

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

async function getInvoice(id: number) {
  const response = await api.get<InvoiceDetailsDto>(`/clients/invoices/${id}`);
  return response.data;
}

const useInvoice = (id: number) => {
  return useQuery(["invoices", id], () => getInvoice(id));
};

const updateInvoice = (id: number) => async (data: UpdateInvoiceDto) => {
  const response = await api.put(`/client/invoice_update/${id}/`, data);
  return response.data;
};

const useUpdateInvoice = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices", id]);
    },
  });
};

function formToDto(values: InvoiceFormType): UpdateInvoiceDto {
  return values.items.map((item) => ({
    contract: item.contract,
    vat_rate: Number(item.vat_rate),
    pre_vat_total: Number(item.pre_vat_total),
  }));
}

async function patchInvoice(id: number, data: Partial<InvoiceDetailsDto>) {
  const response = await api.patch(`/clients/invoices/${id}/update`, data);
  return response.data;
}

const usePatchInvoice = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<InvoiceDetailsDto>) => patchInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices", id]);
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

const UpdateStatus: FunctionComponent<{
  invoice: InvoiceDetailsDto;
}> = ({ invoice }) => {
  const { mutate: updateStatus, isLoading } = usePatchInvoice(invoice.id);
  const { handleSubmit, handleChange, setValues, handleBlur, values } =
    useFormik({
      initialValues: {
        status: invoice.status,
      },
      enableReinitialize: true,
      onSubmit: (values) => {
        updateStatus(values);
      },
    });
  return (
    <form onSubmit={handleSubmit} className={"flex flex-col"}>
      <DetailCell
        className="mb-6"
        label={"Huidige status"}
        value={invoice.status}
      />
      <DetailCell
        label={"Status bijwerken"}
        value={
          <div className="mt-2 mb-5">
            <ToolbarButtonsGroup
              selectedOption={values.status}
              onOptionClicked={(option) => {
                setValues({ status: option.value as any });
              }}
              options={INVOICE_STATUS_GRAPH[invoice.status]}
            />
          </div>
        }
      />
      {values.status === "partially_paid" ||
        (values.status === "overpaid" && (
          <InputField
            name={"payed_amount"}
            label={"Payed amount"}
            placeholder={"Payed amount"}
            className="mb-4"
            type={"number"}
            isPrice={true}
          />
        ))}
      {(values.status === "paid" || values.status === "partially_paid") && (
        <Select
          options={PAYMENT_TYPE_OPTIONS}
          name={"payment_type"}
          label={"Betaalmethode"}
        />
      )}
      <Button type="submit" className="mt-8" isLoading={isLoading}>
        Status bijwerken
      </Button>
    </form>
  );
};

const Page: FunctionComponent<{
  params: { invoiceId: string };
}> = ({ params: { invoiceId } }) => {
  const { data } = useInvoice(+invoiceId);
  const { mutate: updateInvoice, isLoading } = useUpdateInvoice(+invoiceId);
  const initialValues = useMemo(() => {
    return {
      ...invoice,
      items:
        data?.invoice_details?.map((item) => ({
          care_type: item.care_type,
          contract: item.contract,
          pre_vat_total: item.pre_vat_total + "",
          vat_rate: item.vat_rate + "",
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
      return acc + Number(item.pre_vat_total);
    }, 0);
    formik.setFieldValue("pre_vat_total", preVatTotal.toFixed(2));
    const total = values.items.reduce((acc, item) => {
      return (
        acc + Number(item.pre_vat_total) * (1 + Number(item.vat_rate) / 100)
      );
    }, 0);
    formik.setFieldValue("total_amount", total.toFixed(2));
  }, [values.items]);
  return (
    <Panel title={`Factuur #${data?.invoice_number}`}>
      <div className="px-6 py-4 border-b-1 border-stroke dark:border-strokedark">
        {data && <UpdateStatus invoice={data} />}
      </div>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <strong>Items: </strong>
          <br />
          <PricingTable />
          <div className="flex my-5 mr-5 justify-end">
            <Button isLoading={isLoading} formNoValidate={true} type="submit">
              Verzenden
            </Button>
          </div>
        </form>
      </FormikProvider>
    </Panel>
  );
};

const PricingTable: FunctionComponent = () => {
  const { values, setFieldValue } = useFormikContext<InvoiceFormType>();
  return (
    <table className="border-separate border-spacing-2.5 w-full">
      <thead>
        <tr>
          <th>Zorgtype</th>
          <th>BTW</th>
          <th>Prijs</th>
        </tr>
      </thead>
      <tbody>
        {values.items.map((item, index) => (
          <tr key={item.contract}>
            <td className="w-1/3">
              <TableInput
                disabled={true}
                placeholder={"Zorgtype"}
                name={`items[${index}].care_type`}
              />
            </td>
            <td className="w-1/4">
              <TableInput
                variant={"percentage"}
                placeholder={"BTW"}
                type="number"
                name={`items[${index}].used_tax`}
              />
            </td>
            <td className="w-1/4">
              <TableInput
                variant={"currency"}
                placeholder={"Prijs"}
                type="number"
                name={`items[${index}].pre_vat_total`}
              />
            </td>
            <td>
              <div className="flex gap-2.5">
                <ActionButton
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
                  disabled={values.items.length === 1}
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
