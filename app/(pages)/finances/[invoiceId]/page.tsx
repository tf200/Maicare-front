"use client";

import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  InputHTMLAttributes,
  useEffect,
} from "react";
import { InvoiceType } from "@/types/InvoiceStatus";
import Panel from "@/components/Panel";
import { FormikProvider, useField, useFormik, useFormikContext } from "formik";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import FormikCheckboxItem from "@/components/FormFields/FormikCheckboxItem";
import Button from "@/components/buttons/Button";

type InvoiceFormType = {
  invoice_number: string;
  status: InvoiceType;
  items: {
    description: string;
    vat: string;
    price: string;
  }[];
  total: number;
  due_date: string;
  issue_date: number;
  pre_vat_total: string;
  total_amount: string;

  auto_calculate_pre_vat: boolean;
  auto_calculate_total: boolean;
};

const invoice: InvoiceFormType = {
  invoice_number: "123",
  status: "concept",
  items: [
    {
      description: "",
      price: "",
      vat: "",
    },
  ],
  total: 120,
  due_date: "",
  issue_date: null,
  pre_vat_total: "",
  total_amount: "",

  auto_calculate_pre_vat: true,
  auto_calculate_total: true,
};

const Page: FunctionComponent = () => {
  const formik = useFormik({
    initialValues: invoice,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, values } = formik;
  useEffect(() => {
    if (values.auto_calculate_pre_vat) {
      const preVatTotal = values.items.reduce((acc, item) => {
        return acc + Number(item.price);
      }, 0);
      formik.setFieldValue("pre_vat_total", preVatTotal.toFixed(2));
    }
    if (values.auto_calculate_total) {
      const total = values.items.reduce((acc, item) => {
        return acc + Number(item.price) * (1 + Number(item.vat) / 100);
      }, 0);
      formik.setFieldValue("total_amount", total.toFixed(2));
    }
  }, [
    values.items,
    values.auto_calculate_total,
    values.auto_calculate_pre_vat,
  ]);
  return (
    <Panel
      title={`Factuur ${invoice.invoice_number}`}
      containerClassName={"px-6 py-4"}
    >
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <strong>Invoice: </strong> {invoice.invoice_number}
          <br />
          <strong>Status: </strong>
          {invoice.status}
          <br />
          <strong>Items:</strong>
          <br />
          <br />
          <PricingTable />
          <div className="flex my-5 mr-5 justify-end">
            <Button formNoValidate={true} type="submit">
              Submit
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
          <th>Description</th>
          <th>VAT</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {values.items.map((item, index) => (
          <tr key={index}>
            <td className="w-1/3">
              <TableInput
                placeholder={"Description"}
                name={`items[${index}].description`}
              />
            </td>
            <td className="w-1/4">
              <TableInput
                variant={"percentage"}
                placeholder={"VAT"}
                type="number"
                name={`items[${index}].vat`}
              />
            </td>
            <td className="w-1/4">
              <TableInput
                variant={"currency"}
                placeholder={"Price"}
                type="number"
                name={`items[${index}].price`}
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
              <strong>Pre vat total:</strong>
              <FormikCheckboxItem
                label={"Auto calculate"}
                id={"auto_calculate_pre_vat"}
                name={"auto_calculate_pre_vat"}
              />
            </div>
          </td>
          <td>
            <TableInput
              placeholder={"Pre vat total"}
              name={"pre_vat_total"}
              variant={"currency"}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="flex flex-col items-end">
              <strong>Total:</strong>
              <FormikCheckboxItem
                label={"Auto calculate"}
                id={"auto_calculate_total"}
                name={"auto_calculate_total"}
              />
            </div>
          </td>
          <td>
            <TableInput
              placeholder={"Pre vat total"}
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
