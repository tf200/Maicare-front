"use client";

import React, { FunctionComponent, useMemo } from "react";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import {
  useCreateExpense,
  useDeleteExpense,
  useGetExpenses,
} from "@/utils/expenses";
import { ColumnDef } from "@tanstack/react-table";
import { ExpenseFormType, ExpenseResDto } from "@/types/expenses";
import { dateFormat } from "@/utils/timeFormatting";
import PaginatedTable from "@/components/PaginatedTable";
import Loader from "@/components/common/Loader";
import { formatPrice } from "@/utils/priceFormatting";
import { useModal } from "@/components/providers/ModalProvider";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import IconButton from "@/components/buttons/IconButton";
import TrashIcon from "@/components/icons/TrashIcon";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";

const Page: FunctionComponent = (props) => {
  const { open } = useModal(CreateExpenseModal);
  return (
    <Panel
      title={"Uitgaven"}
      sideActions={
        <Button
          className="px-4 py-2"
          onClick={() => {
            open({});
          }}
        >
          {"Nieuwe uitgave"}
        </Button>
      }
    >
      <ExpensesList />
    </Panel>
  );
};

export default Page;

const ExpensesList: FunctionComponent = () => {
  const { data, pagination, isFetching, isLoading } = useGetExpenses();

  const { mutate: deleteExpense } = useDeleteExpense();
  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze uitgave wilt verwijderen?",
      title: "Uitgave Verwijderen",
    })
  );
  const columnDef = useMemo<ColumnDef<ExpenseResDto>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: "Datum",
        cell: ({ row }) => dateFormat(row.original.created),
      },
      {
        accessorKey: "desc",
        header: "Omschrijving",
      },
      {
        accessorKey: "amount",
        header: "Bedrag",
        cell: ({ row }) => formatPrice(row.original.amount),
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <div className="flex gap-4 justify-end">
              <IconButton
                buttonType="Danger"
                onClick={() => {
                  open({
                    onConfirm: () => {
                      deleteExpense(row.original.id);
                    },
                  });
                }}
              >
                <TrashIcon />
              </IconButton>
            </div>
          );
        },
      },
    ];
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  if (data) {
    return (
      <PaginatedTable
        page={pagination.page}
        onPageChange={pagination.setPage}
        columns={columnDef}
        isFetching={isFetching}
        data={data}
      />
    );
  }
};

const CreateExpenseModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const createExpense = useCreateExpense();
  const formik = useFormik<ExpenseFormType>({
    initialValues: {
      amount: "",
      created: "",
      desc: "",
    },
    onSubmit: (values) => {
      createExpense.mutate(
        {
          ...values,
          amount: parseFloat(values.amount),
        },
        {
          onSuccess: () => {
            props.onClose();
          },
        }
      );
    },
  });
  const { handleSubmit, handleBlur, errors, touched, values, handleChange } =
    formik;
  return (
    <FormModal {...props} title={"Nieuwe uitgave"}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <InputField
            label={"Datum"}
            name={"created"}
            type={"date"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.created}
            error={touched.created && errors.created}
            placeholder={"Datum"}
          />
          <InputField
            label={"Omschrijving"}
            name={"desc"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.desc}
            error={touched.desc && errors.desc}
            placeholder={"Omschrijving"}
          />
          <InputField
            label={"Bedrag"}
            name={"amount"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            isPrice={true}
            value={values.amount}
            error={touched.amount && errors.amount}
            placeholder={"Bedrag"}
          />
          <div className="flex gap-4 justify-center">
            <Button
              buttonType="Outline"
              onClick={() => {
                props.onClose();
              }}
            >
              {"Annuleren"}
            </Button>
            <Button
              type="submit"
              disabled={createExpense.isLoading}
              isLoading={createExpense.isLoading}
            >
              {"Opslaan"}
            </Button>
          </div>
        </form>
      </FormikProvider>
    </FormModal>
  );
};
