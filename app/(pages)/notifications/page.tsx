"use client";
import React, { FunctionComponent, useCallback, useMemo } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import { useNotifications } from "@/utils/notifications/getNotifications";
import { ColumnDef } from "@tanstack/react-table";
import { NotificationItem } from "@/types/notifications/notifications-list.dto";
import Panel from "@/components/Panel";
import { shortDateTimeFormat } from "@/utils/timeFormatting";
import styles from "./styles.module.scss";
import BellIcon from "@/components/icons/BellIcon";
import { Row } from "@tanstack/table-core";
import { useMarkAsRead } from "@/utils/notifications/markAsRead";
import { useMedicalRecordNotif } from "@/hooks/useMedicalRecordNotif";

const Page: FunctionComponent = (props) => {
  const { data, page, setPage, isFetching } = useNotifications();
  const { mutate: markAsRead } = useMarkAsRead();
  const { reportMedication } = useMedicalRecordNotif();
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

  const rowClassName = useCallback(
    (row: Row<NotificationItem>) => (row.original.is_read ? "" : styles.unread),
    []
  );

  return (
    <Panel
      title={"Notifications"}
      header={
        <h2 className="flex items-center gap-2">
          <BellIcon className="inline-block" />
          <span className="inline-block font-medium text-slate-800  dark:text-white">
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
          rowClassName={rowClassName}
          onRowClick={(notification) => {
            if (notification.event === "medication_time") {
              reportMedication(notification.metadata.medication_record_id);
            }
            markAsRead(notification.id);
          }}
        />
      )}
    </Panel>
  );
};

export default Page;
