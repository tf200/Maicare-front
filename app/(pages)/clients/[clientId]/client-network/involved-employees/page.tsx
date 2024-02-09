"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useEmergencyContactList } from "@/utils/emergency/getEmergencyContactList";
import { PAGE_SIZE } from "@/consts";
import Panel from "@/components/Panel";
type Props = {
  params: { clientId: string };
};

const InvolvedEmployeesPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { page, setPage, isFetching, isLoading, isError, data } =
    useEmergencyContactList(clientId);

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "first_name",
        header: () => "First name",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "last_name",
        header: () => "Last name",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "email",
        header: () => "Email address",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "phone_number",
        header: () => "Phone number",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "relationship",
        header: () => "Relation",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "relation_status",
        header: () => "Distance",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "address",
        header: () => "Address physique",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "auto_reports",
        header: () => "Automatic reports",
        cell: (info) => (
          <div className="flex justify-center">
            <input
              className="w-[20px] h-[20px]"
              type="checkbox"
              checked={info.getValue()}
              onChange={() => {}}
            ></input>
          </div>
        ),
      },
    ];
  }, []);

  const pagination = data ? (
    <div className="p-4 sm:p-6 xl:p-7.5 flex items-center justify-between">
      <Pagination
        page={page}
        disabled={isFetching}
        onClick={setPage}
        totalPages={Math.ceil(data.count / PAGE_SIZE)}
      />
      {isFetching && <div className="text-sm">Fetching page {page}...</div>}
    </div>
  ) : (
    <></>
  );

  return (
    <Panel
      title={"Involved Employees List"}
      sideActions={
        <Link
          href={`/clients/${clientId}/involved-employees/new`}
          className="inline-flex items-center justify-center px-10 py-4 font-medium text-center text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add employee
        </Link>
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
      {pagination}
      {data && <Table data={data.results} columns={columnDef} />}
      {pagination}
      {isError && (
        <p role="alert" className="text-red">
          An error has occurred
        </p>
      )}
    </Panel>
  );
};

export default InvolvedEmployeesPage;
