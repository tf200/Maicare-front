import React, { FunctionComponent, useMemo } from "react";
import {
  useCreateContractWorkingHours,
  useGetContractWorkingHours,
} from "@/utils/contracts";
import Button from "@/components/buttons/Button";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import { FormikProvider, useFormik } from "formik";
import { WorkingHoursFormType, WorkingHoursResDto } from "@/types/contracts";
import dayjs from "dayjs";
import * as Yup from "yup";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import { useModal } from "@/components/providers/ModalProvider";
import PaginatedTable from "@/components/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import Loader from "@/components/common/Loader";

const WorkingHours: FunctionComponent<{
  contractId: number;
}> = ({ contractId }) => {
  const { open } = useModal(AddWorkingHoursModal);
  const { data, pagination, isLoading, isFetching, isError } =
    useGetContractWorkingHours(contractId);
  const columnDef = useMemo<ColumnDef<WorkingHoursResDto>[]>(() => {
    return [
      {
        header: "Datum",
        accessorKey: "datetime",
        cell: ({ getValue }) =>
          dayjs(getValue() as string).format("DD-MM-YYYY HH:mm"),
      },
      {
        header: "Notities",
        accessorKey: "notes",
      },
      {
        header: "Uren",
        accessorKey: "minutes",
        cell: ({ getValue }) => {
          const hours = Math.floor((getValue() as number) / 60);
          const minutes = (getValue() as number) % 60;
          return `${hours} uur ${minutes} minuten`;
        },
      },
    ];
  }, []);
  return (
    <>
      <div className="mt-8 border-t-1 border-stroke">
        <h2 className="text-xl px-7 py-4 font-semibold">Werkuren</h2>
        {data?.count === 0 && (
          <p className="mt-2 px-7 py-4 text-sm text-gray-600">
            Er zijn geen werkuren ingepland.
          </p>
        )}
        {isLoading && <Loader />}
        {data && (
          <PaginatedTable
            columns={columnDef}
            page={pagination.page}
            data={data}
            onPageChange={pagination.setPage}
            isFetching={isFetching}
          />
        )}
        <div className="flex px-7 py-4">
          <Button
            onClick={() => {
              open({
                contractId,
              });
            }}
          >
            Werkuren toevoegen
          </Button>
        </div>
      </div>
    </>
  );
};

export default WorkingHours;

const AddWorkingHoursModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const { mutate: createWorkingHours, isLoading: isCreating } =
    useCreateContractWorkingHours(additionalProps.contractId);
  const formik = useFormik<WorkingHoursFormType>({
    initialValues: {
      datetime: dayjs().format("YYYY-MM-DDTHH:mm"),
      hours: "",
      minutes: "",
      notes: "",
    },
    validationSchema: Yup.object().shape({}),
    onSubmit: (formValues) => {
      createWorkingHours(
        {
          notes: formValues.notes,
          datetime: formValues.datetime,
          minutes:
            parseInt(formValues.hours) * 60 + parseInt(formValues.minutes),
        },
        {
          onSuccess: () => {
            props.onClose();
          },
        }
      );
    },
  });
  const { handleSubmit, handleChange, touched, errors, handleBlur, values } =
    formik;
  return (
    <FormModal {...props} title={"Werkuren toevoegen"}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <InputField
            value={values.datetime}
            onChange={handleChange}
            onBlur={handleBlur}
            className={"mb-4"}
            name="datetime"
            label="Datum en tijd"
            placeholder={"Datum en tijd"}
            type="datetime-local"
            error={touched.datetime && errors.datetime}
          />
          <div className="flex gap-4">
            <InputField
              value={values.hours}
              onChange={handleChange}
              onBlur={handleBlur}
              className={"mb-4 flex-grow"}
              min={0}
              unit={"uur"}
              name="hours"
              placeholder={"Uren"}
              label="Uren"
              type="number"
              error={touched.hours && errors.hours}
            />
            <InputField
              value={values.minutes}
              onChange={handleChange}
              onBlur={handleBlur}
              className={"mb-4 flex-grow"}
              placeholder={"Minuten"}
              min={0}
              unit={"minuten"}
              name="minutes"
              label="Minuten"
              type="number"
              error={touched.minutes && errors.minutes}
            />
          </div>
          <Textarea
            rows={6}
            value={values.notes}
            onChange={handleChange}
            className={"mb-4"}
            placeholder={"Notities"}
            onBlur={handleBlur}
            name="notes"
            label="Notities"
            error={touched.notes && errors.notes}
          />
          <div className="flex items-center justify-center gap-4">
            <Button
              buttonType="Outline"
              onClick={() => {
                props.onClose();
              }}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={isCreating} isLoading={isCreating}>
              Opslaan
            </Button>
          </div>
        </form>
      </FormikProvider>
    </FormModal>
  );
};
