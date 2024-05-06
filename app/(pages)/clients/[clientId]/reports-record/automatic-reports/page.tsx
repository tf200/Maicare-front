"use client";

import React, { FunctionComponent, useMemo } from "react";
import Button from "@/components/buttons/Button";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import {
  useAutomaticReports,
  useGenerateAutomaticReports,
} from "@/utils/automatic-reports";
import { FormikProvider, useFormik } from "formik";
import {
  AutomaticReportFormType,
  AutomaticReportItem,
} from "@/types/automatic-reports";
import InputField from "@/components/FormFields/InputField";
import { useModal } from "@/components/providers/ModalProvider";
import dayjs from "dayjs";
import Sparkles from "@/components/icons/Sparkles";
import PaginatedTable from "@/components/PaginatedTable";
import Loader from "@/components/common/Loader";
import { ColumnDef } from "@tanstack/react-table";
import styles from "./styles.module.scss";
import { dateFormat } from "@/utils/timeFormatting";

const Page: FunctionComponent<{
  params: {
    clientId: string;
  };
}> = ({ params: { clientId } }) => {
  const { open: generateReport } = useModal(GenerateAutomaticReportModal);
  return (
    <>
      <div className="flex p-4">
        <Button
          onClick={() => {
            generateReport({
              clientId: parseInt(clientId),
            });
          }}
          className="ml-auto flex items-center gap-4"
        >
          <Sparkles /> <span>Genereer automatische rapporten</span>
        </Button>
      </div>
      <ReportsList clientId={parseInt(clientId)} />
    </>
  );
};

export default Page;

const ReportsList: FunctionComponent<{ clientId: number }> = ({ clientId }) => {
  const { data, isLoading, isFetching, pagination } =
    useAutomaticReports(clientId);
  const columnDef = useMemo<ColumnDef<AutomaticReportItem>[]>(() => {
    return [
      {
        accessorKey: "title",
        header: "Titel",
        cell: ({ row: { original } }) => (
          <div>
            <div className="italic text-xs">
              {dateFormat(original.start_date)} -{" "}
              {dateFormat(original.end_date)}
            </div>
            <div className="text-sm font-bold">{original.title}</div>
            <div className="">{original.content}</div>
          </div>
        ),
      },
    ];
  }, []);

  if (isLoading) return <Loader />;
  if (!data) return null;
  return (
    <PaginatedTable
      data={data}
      columns={columnDef}
      page={pagination.page}
      onPageChange={pagination.setPage}
      className={styles.table}
      isFetching={isFetching}
    />
  );
};

const GenerateAutomaticReportModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const clientId: number = additionalProps.clientId;
  const { mutate: generate, isLoading: isCreating } =
    useGenerateAutomaticReports(clientId);
  const formik = useFormik<AutomaticReportFormType>({
    initialValues: {
      from: "",
      to: "",
    },
    onSubmit: (values) => {
      generate(
        {
          client_id: clientId,
          ...values,
        },
        {
          onSuccess: () => {
            props.onClose();
          },
        }
      );
    },
  });
  const { handleSubmit, handleBlur, handleChange, values } = formik;
  return (
    <FormModal {...props} title={"Genereer automatische rapporten"}>
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <InputField
            name="from"
            label="Van"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.from}
            required={true}
            className={"mb-6"}
            max={values.to || dayjs().toISOString().split("T")[0]}
          />
          <InputField
            name="to"
            label="Tot"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.to}
            required={true}
            className={"mb-10"}
            min={values.from}
            max={new Date().toISOString().split("T")[0]}
          />
          <div className="flex justify-center gap-4">
            <Button buttonType="Outline" type="submit" disabled={isCreating}>
              Annuleer
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              isLoading={isCreating}
              className="flex items-center gap-4"
            >
              <Sparkles /> <span>Genereer</span>
            </Button>
          </div>
        </form>
      </FormikProvider>
    </FormModal>
  );
};
