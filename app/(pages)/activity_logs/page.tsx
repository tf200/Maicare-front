"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useActivityLogs } from "@/utils/activity_logs";
import { ColumnDef } from "@tanstack/react-table";
import { ActivityLogItem } from "@/types/activity_logs";
import Loader from "@/components/common/Loader";
import PaginatedTable from "@/components/PaginatedTable";
import { shortDateTimeFormat } from "@/utils/timeFormatting";
import Panel from "@/components/Panel";

const Page: FunctionComponent = (props) => {
  return <Panel title={"Activiteitenlog"}>{<List />}</Panel>;
};

export default Page;

const List = () => {
  const { data, isLoading, isFetching, pagination } = useActivityLogs();
  const columnDef = useMemo<ColumnDef<ActivityLogItem>[]>(() => {
    return [
      {
        accessorKey: "datetime",
        header: "Datum",
        cell: (row) => shortDateTimeFormat(row.getValue() as string),
      },
      {
        accessorKey: "user_name", // employee
        header: "Medewerker",
        cell: (row) => row.getValue() || "-",
      },
      {
        accessorKey: "event_type_name", // event
        header: "Gebeurtenis",
      },
      {
        accessorKey: "content_type_name", // resource
        header: "Bron",
      },
    ];
  }, []);
  if (isLoading) return <Loader />;
  if (!data) return null;
  return (
    <PaginatedTable
      data={data}
      columns={columnDef}
      page={pagination.page}
      onPageChange={pagination.setPage}
      isFetching={isFetching}
      renderRowDetails={({ original: data }) => {
        const parsedObjectJsonRepr = JSON.parse(data.object_json_repr);
        const parsedChangedFields = JSON.parse(data.changed_fields);

        return (
          <div className={"overflow-x-auto"}>
            <div className="mb-5">
              <b className="block">### Object REPR (ID: #{data.object_id}) ###</b>
              <i>{data.object_repr}</i>
            </div>
            <div className="mb-5">
              <b className="block">### DATA ###</b>
              <code>
                <pre>{JSON.stringify(parsedObjectJsonRepr, null, 2)}</pre>
              </code>
            </div>
            <div className="mb-5">
              <b className="block">### Changed Fields ###</b>
              <code>
                <pre>{JSON.stringify(parsedChangedFields, null, 2)}</pre>
              </code>
            </div>
          </div>
        );
      }}
    />
  );
};
