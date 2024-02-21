"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useInvolvedEmployeesList } from "@/utils/involved-employees/getInvolvedEmployeesList";
import { PAGE_SIZE } from "@/consts";
import Panel from "@/components/Panel";
import dayjs from "dayjs";
import "dayjs/locale/en";
import PaginatedTable from "@/components/PaginatedTable";

type Props = {
  params: { clientId: string };
};

const InvolvedEmployeesPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { pagination, isFetching, isLoading, isError, data } =
    useInvolvedEmployeesList(parseInt(clientId));

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "employee_name",
        header: () => "Medewerker",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "role",
        header: () => "Relatie",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "start_date",
        header: () => "Startdatum",
        cell: (info) =>
          dayjs(info.getValue()).format("DD MMM, YYYY") || "Not Available",
      },
    ];
  }, []);

  return (
    <Panel
      title={"Involved Employees List"}
      sideActions={
        <Link
          href={`/clients/${clientId}/involved-employees/new`}
          className="inline-flex items-center justify-center px-10 py-4 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Medewerker toevoegen
        </Link>
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
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
          Er is een fout opgetreden.
        </p>
      )}
    </Panel>
  );
};

export default InvolvedEmployeesPage;
