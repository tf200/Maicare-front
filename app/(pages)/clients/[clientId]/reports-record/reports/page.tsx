"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/table-core";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import LinkButton from "@/components/buttons/LinkButton";
import { ReportsListItem } from "@/types/reports/reports-list-res-dto";
import { useReportsList } from "@/utils/reports/getReportsList";

type Props = {
  params: { clientId: string };
};

const ReportsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { page, setPage, isFetching, isLoading, isError, data } =
    useReportsList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<ReportsListItem>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: () => "Date",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "report_text",
        header: () => "Report Description",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "title",
        header: () => "Title",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "author",
        header: () => "Written By",
        cell: (info) => info.getValue() || "Not Available",
      },
    ];
  }, []);

  const pageCount = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

  const pagination =
    data && pageCount > 0 ? (
      <>
        <Pagination
          page={page}
          disabled={isFetching} /* TODO: WE NEED TO IMPROVE UX HERE */
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
          text={"Add Reports"}
          href={"../reports/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && <Table data={data.results} columns={columnDef} />}
      <div className="flex flex-wrap items-center justify-between p-4">
        {pagination}
      </div>
      {isError && (
        <p role="alert" className="text-red">
          Reports Sorry an error has prevented us from loading the list.
        </p>
      )}
    </>
  );
};

export default ReportsPage;
