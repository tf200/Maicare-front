"use client";

import React, { FunctionComponent, useEffect, useMemo } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/table-core";
import Severity from "@/components/Severity";
import { useDiagnosisList } from "@/utils/diagnosis/getDiagnosisList";
import Loader from "@/components/common/Loader";
import { DiagnosisListItem } from "@/types/diagnosis/diagnosis-list-res-dto";
import LinkButton from "@/components/buttons/LinkButton";
import DetailCell from "@/components/DetailCell";
import { fullDateFormat } from "@/utils/timeFormatting";
import PaginatedTable from "@/components/PaginatedTable";
import IconButton from "@/components/buttons/IconButton";
import TrashIcon from "@/components/icons/TrashIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useDeleteDiagnosis } from "@/utils/diagnosis/deleteDiagnosis";

type Props = {
  params: { clientId: string };
};

const DiagnosisPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { pagination, isFetching, isLoading, isError, data } = useDiagnosisList(
    parseInt(clientId)
  );

  const columnDef = useMemo<ColumnDef<DiagnosisListItem>[]>(() => {
    const columnHelper = createColumnHelper<DiagnosisListItem>();

    return [
      {
        accessorKey: "title",
        header: () => "Samenvatting",
      },
      {
        accessorKey: "description",
        header: () => "Diagnose",
      },
      {
        accessorKey: "diagnosis_code",
        header: () => "Diagnosecode",
      },
      columnHelper.accessor("severity", {
        header: (Header) => (
          <div className="flex justify-center w-full">Ernst</div>
        ),
        cell: (info) => (
          <div className="flex justify-center w-full">
            <Severity severity={info.getValue()} />
          </div>
        ),
      }),
      {
        accessorKey: "date_of_diagnosis",
        header: () => "Datum van diagnose",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Diagnose Toevoegen"}
          href={"../diagnosis/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
          data={data}
          columns={columnDef}
          renderRowDetails={({ original }) => <RowDetails data={original} />}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          onPageChange={(page) => pagination.setPage(page)}
        />
      )}
      <div className="flex flex-wrap items-center justify-between p-4"></div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry, een fout heeft ons verhinderd de diagnoselijst te laden.
        </p>
      )}
    </>
  );
};

export default DiagnosisPage;

type RowDetailsProps = {
  data: DiagnosisListItem;
};

const RowDetails: FunctionComponent<RowDetailsProps> = ({ data }) => {
  const {
    mutate: deleteDiagnosis,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteDiagnosis(data.client);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Are you sure you want to delete this diagnosis ?",
      title: "Delete Diagnosis",
    })
  );

  return (
    <div className={"grid grid-cols-3 gap-2"}>
      <DetailCell label={"Samenvatting"} value={data.title} />
      <DetailCell label={"Diagnosecode"} value={data.diagnosis_code} />
      <DetailCell label={"Diagnose"} value={data.description} />
      <DetailCell
        label={"Ernst"}
        value={
          <div className="mt-2">
            <Severity severity={data.severity} />
          </div>
        }
      />
      <DetailCell label={"Status"} value={data.status} />
      <DetailCell
        label={"Diagnose van een arts"}
        value={data.diagnosing_clinician}
      />
      <DetailCell
        className={"col-span-3"}
        label={"Notities"}
        value={data.notes}
      />
      <div>
        <IconButton
          buttonType="Danger"
          onClick={() => {
            open({
              onConfirm: () => {
                deleteDiagnosis(data.id);
              },
            });
          }}
          disabled={isDeleted}
          isLoading={isDeleting}
        >
          {isDeleted ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </IconButton>
      </div>
    </div>
  );
};
