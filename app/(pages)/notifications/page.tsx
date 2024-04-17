"use client";
import React, { FunctionComponent, useMemo } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import { useNotifications } from "@/utils/notifications/getNotifications";
import { ColumnDef } from "@tanstack/react-table";
import { NotificationItem } from "@/types/notifications/notifications-list.dto";
import Panel from "@/components/Panel";
import { dateFormat, shortDateTimeFormat } from "@/utils/timeFormatting";
import styles from "./styles.module.scss";
import BellIcon from "@/components/icons/BellIcon";

const Page: FunctionComponent = (props) => {
  const { data, page, setPage, isFetching } = useNotifications();

  const columns = useMemo<ColumnDef<NotificationItem>[]>(() => {
    return [
      {
        header: "Datum",
        accessorKey: "created",
        cell: (item) => shortDateTimeFormat(item.getValue() as string),
      },
      {
        header: "Titel",
        accessorKey: "title",
      },
      {
        header: "Bericht",
        accessorKey: "content",
      },
    ];
  }, []);

  return (
    <Panel
      title={"Notifications"}
      header={
        <h2 className="flex items-center gap-2">
          <BellIcon className="inline-block" />
          <span className="inline-block font-medium text-black dark:text-white">
            Notifications
          </span>
        </h2>
      }
    >
      {data && (
        <PaginatedTable
          isFetching={isFetching}
          className={styles.table}
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
