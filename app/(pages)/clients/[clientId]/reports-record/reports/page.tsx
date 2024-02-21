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
import PaginatedTable from "@/components/PaginatedTable";

type Props = {
  params: { clientId: string };
};

const ReportsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { pagination, isFetching, isLoading, isError, data } = useReportsList(
    parseInt(clientId)
  );

  const columnDef = useMemo<ColumnDef<ReportsListItem>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: () => "Datum",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "report_text",
        header: () => "Beschrijving van het Rapport",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "title",
        header: () => "Titel",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "author",
        header: () => "Geschreven Door",
        cell: (info) => info.getValue() || "Not Available",
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Rapporten Toevoegen"}
          href={"../reports/new"}
          className="ml-auto"
        />
      </div>
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
          data={data}
          columns={columnDef}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          onPageChange={(page) => pagination.setPage(page)}
        />
      )}
      {isError && (
        <p role="alert" className="text-red">
          Sorry, een fout heeft ons verhinderd de lijst te laden.
        </p>
      )}
    </>
  );
};

export default ReportsPage;
