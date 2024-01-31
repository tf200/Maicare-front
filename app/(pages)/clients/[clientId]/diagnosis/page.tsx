"use client";

import React, { FunctionComponent, useMemo, useState } from "react";
import Link from "next/link";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/table-core";
import { DiagnosisResDto } from "@/types/diagnosis/diagnosis-res-dto";
import Severity from "@/components/Severity";
import Pagination from "@/components/Pagination";
import { useDiagnosisList } from "@/utils/diagnosis/getDiagnosisList";
import { PAGE_SIZE } from "@/consts";
import Panel from "@/components/Panel";

type Props = {
  params: { clientId: string };
};

const DiagnosisPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { page, setPage, isFetching, isLoading, isError, data } =
    useDiagnosisList(clientId);

  const columnDef = useMemo<ColumnDef<DiagnosisResDto>[]>(() => {
    const columnHelper = createColumnHelper<DiagnosisResDto>();

    return [
      {
        accessorKey: "title",
        header: () => "Summary",
      },
      {
        accessorKey: "description",
        header: () => "Diagnosis",
      },
      {
        accessorKey: "diagnosis_code",
        header: () => "Diagnosis code",
      },
      columnHelper.accessor("severity", {
        header: () => "Severity",
        cell: (info) => (
          <div className="w-full flex justify-center">
            <Severity severity={info.getValue()} />
          </div>
        ),
      }),
      {
        accessorKey: "date_of_diagnosis",
        header: () => "Date of diagnosis",
      },
    ];
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <Panel
      title={"Diagnosis List"}
      sideActions={
        <Link
          href={`/clients/${clientId}/diagnosis/new`}
          className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add new diagnosis
        </Link>
      }
    >
      <Pagination
        page={page}
        disabled={isFetching}
        onClick={setPage}
        totalPages={Math.ceil(data.count / PAGE_SIZE)}
      />
      {data && <Table data={data.results} columns={columnDef} />}
      <Pagination
        page={page}
        disabled={isFetching}
        onClick={setPage}
        totalPages={Math.ceil(data.count / PAGE_SIZE)}
      />
      {isError && (
        <p role="alert" className="text-red">
          An error has occurred
        </p>
      )}
    </Panel>
  );
};

export default DiagnosisPage;
