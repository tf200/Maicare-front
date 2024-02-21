"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/table-core";
import Severity from "@/components/Severity";
import Pagination from "@/components/Pagination";
import { useDiagnosisList } from "@/utils/diagnosis/getDiagnosisList";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import { DiagnosisListItem } from "@/types/diagnosis/diagnosis-list-res-dto";
import LinkButton from "@/components/buttons/LinkButton";
import DetailCell from "@/components/DetailCell";
import ChevronDown from "@/components/icons/ChevronDown";
import clsx from "clsx";
import { fullDateFormat } from "@/utils/timeFormatting";
import router from "next/router";
import PaginatedTable from "@/components/PaginatedTable";

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
    </div>
  );
};
