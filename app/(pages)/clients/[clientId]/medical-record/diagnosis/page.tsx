"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/table-core";
import { DiagnosisResDto } from "@/types/diagnosis/diagnosis-res-dto";
import Severity from "@/components/Severity";
import Pagination from "@/components/Pagination";
import { useDiagnosisList } from "@/utils/diagnosis/getDiagnosisList";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import { DiagnosisListItem } from "@/types/diagnosis/diagnosis-list-res-dto";
import LinkButton from "@/components/buttons/LinkButton";

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
        header: (Header) => (
          <div className="flex justify-center w-full">Severity</div>
        ),
        cell: (info) => (
          <div className="flex justify-center w-full">
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

  const pagination = data ? (
    <>
      <Pagination
        page={page}
        disabled={isFetching} /* TODO: WE NEED TO IMPROVE UX HERE */
        onClick={setPage}
        totalPages={Math.ceil(data.count / PAGE_SIZE)}
      />
      {isFetching && (
        <div className="text-sm ml-2">Fetching page {page}...</div>
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
          text={"Add a Diagnosis"}
          href={"diagnosis/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && <Table data={data.results} columns={columnDef} />}
      <div className="flex flex-wrap justify-between items-center p-4">
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
