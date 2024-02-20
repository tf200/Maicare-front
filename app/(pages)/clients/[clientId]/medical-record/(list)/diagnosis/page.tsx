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

type Props = {
  params: { clientId: string };
};

const DiagnosisPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { page, setPage, isFetching, isLoading, isError, data } =
    useDiagnosisList(parseInt(clientId));

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

  const pageCount = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  const pagination =
    data && pageCount > 0 ? (
      <>
        <Pagination
          page={page}
          disabled={isFetching}
          onClick={setPage}
          totalPages={pageCount}
        />
        {isFetching && (
          <div className="ml-2 text-sm">Fetching page {page}...</div>
        )}
      </>
    ) : (
      <></>
    );

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        {pagination}
        <LinkButton
          text={"Diagnose Toevoegen"}
          href={"../diagnosis/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && (
        <Table
          data={data.results}
          columns={columnDef}
          renderRowDetails={({ original }) => <RowDetails data={original} />}
        />
      )}
      <div className="flex flex-wrap items-center justify-between p-4">
        {pagination}
      </div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry an error has prevented us from loading the diagnosis list.
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
      <DetailCell label={"Summary"} value={data.title} />
      <DetailCell label={"Diagnosis Code"} value={data.diagnosis_code} />
      <DetailCell label={"Diagnosis"} value={data.description} />
      <DetailCell
        label={"Severity"}
        value={
          <div className="mt-2">
            <Severity severity={data.severity} />
          </div>
        }
      />
      <DetailCell label={"Status"} value={data.status} />
      <DetailCell
        label={"Diagnosing Clinician"}
        value={data.diagnosing_clinician}
      />
      <DetailCell className={"col-span-3"} label={"Notes"} value={data.notes} />
    </div>
  );
};
