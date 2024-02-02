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

type Props = {
  params: { clientId: string };
};

const DiagnosisPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { page, setPage, isFetching, isLoading, isError, data } =
    useDiagnosisList(parseInt(clientId));

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
    <div className="p-4 sm:p-6 xl:p-7.5 flex items-center justify-between">
      <Pagination
        page={page}
        disabled={isFetching} /* TODO: WE NEED TO IMPROVE UX HERE */
        onClick={setPage}
        totalPages={Math.ceil(data.count / PAGE_SIZE)}
      />
      {isFetching && <div className="text-sm">Fetching page {page}...</div>}
    </div>
  ) : (
    <></>
  );

  return (
    <>
      {isLoading && <Loader />}
      {pagination}
      {data && <Table data={data.results} columns={columnDef} />}
      {pagination}
      {isError && (
        <p role="alert" className="text-red">
          An error has occurred
        </p>
      )}
    </>
  );
};

export default DiagnosisPage;
