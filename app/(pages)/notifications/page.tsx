"use client";
import React, { FunctionComponent, useMemo } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import { useNotifications } from "@/utils/notifications/getNotifications";
import { ColumnDef } from "@tanstack/react-table";
import { NotificationItem } from "@/types/notifications/notifications-list.dto";
import Panel from "@/components/Panel";
import { dateFormat, shortDateTimeFormat } from "@/utils/timeFormatting";

const Page: FunctionComponent = (props) => {
  const { data, page, setPage } = useNotifications();

  const columns = useMemo<ColumnDef<NotificationItem>[]>(() => {
    return [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Message",
        accessorKey: "content",
      },
      {
        header: "Date",
        cell: (item) => shortDateTimeFormat(item.getValue() as string),
      },
    ];
  }, []);

  return (
    <Panel title="Notifications">
      {data && (
        <PaginatedTable
          data={data}
          columns={columns}
          page={page}
          onPageChange={setPage}
        />
      )}
    </Panel>
  );
};

export default Page;
