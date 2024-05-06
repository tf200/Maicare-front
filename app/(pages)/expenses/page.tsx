"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import {
  useCreateExpense,
  useDeleteExpense,
  useGetExpenses,
  useUpdateExpense,
} from "@/utils/expenses";
import { ColumnDef } from "@tanstack/react-table";
import {
  ExpenseFormType,
  ExpenseResDto,
  ExpensesSearchParams,
} from "@/types/expenses";
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
import FilesUploader from "@/components/FormFields/FilesUploader";
import FilesDeleter from "@/components/FormFields/FilesDeleter";
import PencilSquare from "@/components/icons/PencilSquare";
import dayjs from "dayjs";
import { omit } from "@/utils/omit";
import DetailCell from "@/components/DetailCell";
import DownloadFile from "@/components/DownloadFile";
import FormikLocation, {
  LocationSelect,
} from "@/components/FormFields/FormikLocation";

const Page: FunctionComponent = (props) => {
  const { open } = useModal(ExpenseModal);
  const [filters, setFilters] = useState<ExpensesSearchParams>({});
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
      <div className="py-2 px-4 flex justify-end">
        <LocationSelect
          label={""}
          className="lg:max-w-70 w-full"
          value={filters.location ? filters.location.toString() : ""}
          onChange={({ target: { value } }) =>
            setFilters({ location: value ? +value : undefined })
          }
        />
      </div>
      <ExpensesList filters={filters} />
    </Panel>
  );
};

export default Page;

const ExpensesList: FunctionComponent<{
  filters?: ExpensesSearchParams;
}> = ({ filters }) => {
  const { data, pagination, isFetching, isLoading } = useGetExpenses(filters);

  const { mutate: deleteExpense } = useDeleteExpense();
  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze uitgave wilt verwijderen?",
      title: "Uitgave Verwijderen",
    })
  );

  const { open: openExpenseModal } = useModal(ExpenseModal);
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
        cell: ({ row: { original: expense } }) => {
          return (
            <div>
              <div>
                <span className="text-sm font-bold">Beldrag ext. BTW</span>{" "}
                <span>{formatPrice(expense.amount)}</span>
              </div>
              <div>
                <span className="text-sm font-bold">Beldrag incl. BTW</span>{" "}
                <span>
                  {formatPrice(
                    parseFloat(expense.amount + "") +
                      (expense.tax / 100) * expense.amount
                  )}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "tax",
        header: "BTW",
        cell: ({
          row: {
            original: { tax },
          },
        }) => (tax ? tax + "%" : "N/A"),
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return (
            <div className="flex gap-4 justify-end">
              <IconButton
                buttonType="Primary"
                onClick={(e) => {
                  e.stopPropagation();
                  openExpenseModal({ data: row.original });
                }}
              >
                <PencilSquare className="w-5 h-5" />
              </IconButton>
              <IconButton
                buttonType="Danger"
                onClick={(e) => {
                  e.stopPropagation();
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
        renderRowDetails={({ original: data }) => {
          return <ExpenseDetails data={data} />;
        }}
      />
    );
  }
};

const ExpenseDetails: FunctionComponent<{ data: ExpenseResDto }> = ({
  data,
}) => {
  return (
    <div className="grid gap-4 grid-cols-3">
      <DetailCell
        label={"Datum"}
        value={dateFormat(data.created)}
        ignoreIfEmpty={true}
      />
      <DetailCell
        label={"Omschrijving"}
        value={data.desc}
        ignoreIfEmpty={true}
      />
      <DetailCell
        label={"Bedrag"}
        value={formatPrice(data.amount)}
        ignoreIfEmpty={true}
      />
      {data.attachments?.length > 0 && (
        <div className={"col-span-3"}>
          <h3 className="text-lg font-semibold mb-2">{"Bijlagen"}</h3>
          <div className="flex gap-4">
            {data.attachments.map((attachment) => {
              return <DownloadFile file={attachment} key={attachment.id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const ExpenseModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const initialData: ExpenseResDto = additionalProps?.data;
  const { mutate: createExpense, isLoading: isCreating } = useCreateExpense();
  const { mutate: updateExpense, isLoading: isUpdating } = useUpdateExpense(
    initialData?.id
  );

  const initialValues = useMemo(() => {
    return initialData
      ? {
          amount: initialData.amount.toString(),
          tax: initialData.tax?.toString() || "",
          location: initialData.location?.toString(),
          created: dayjs(initialData.created).format("YYYY-MM-DD"),
          desc: initialData.desc,
          added_attachments: [],
          removed_attachments: [],
        }
      : {
          amount: "",
          location: "",
          tax: "",
          created: "",
          desc: "",
          added_attachments: [],
          removed_attachments: [],
        };
  }, [initialData]);
  const formik = useFormik<ExpenseFormType>({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      const method = initialData ? updateExpense : createExpense;
      method(
        {
          ...omit(values, ["added_attachments", "removed_attachments"]),
          amount: parseFloat(values.amount),
          tax: parseFloat(values.tax),
          location_id: +values.location,
          attachment_ids:
            initialData?.attachments
              .filter((a) => !values.removed_attachments.includes(a.id))
              .map((a) => a.id)
              .concat(values.added_attachments) ?? values.added_attachments,
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
    <FormModal
      {...props}
      title={initialData ? "Uitgave bewerken" : "Nieuwe uitgave"}
    >
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
          <FormikLocation required={true} className="mb-0" />
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
            label={"Bedrag excl. BTW"}
            name={"amount"}
            required={true}
            type={"number"}
            onChange={handleChange}
            onBlur={handleBlur}
            isPrice={true}
            value={values.amount}
            error={touched.amount && errors.amount}
            placeholder={"Bedrag"}
            min={0}
          />
          <InputField
            unit={"%"}
            name={"tax"}
            label={"BTW"}
            type={"number"}
            value={values.tax}
            onBlur={handleBlur}
            placeholder={"BTW"}
            onChange={handleChange}
            error={touched.tax && errors.tax}
            min={0}
          />
          <section>
            <FilesUploader
              label={"Bijlagen"}
              endpoint={"global_v2"}
              name={"added_attachments"}
            />
            {initialData && (
              <FilesDeleter
                id={"removed_attachments"}
                name={"removed_attachments"}
                alreadyUploadedFiles={initialData.attachments}
              />
            )}
          </section>
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
              disabled={isCreating || isUpdating}
              isLoading={isCreating || isUpdating}
            >
              {"Opslaan"}
            </Button>
          </div>
        </form>
      </FormikProvider>
    </FormModal>
  );
};
