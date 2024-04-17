"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useMedicationRecords } from "@/utils/medication-records";
import Panel from "@/components/Panel";
import PaginatedTable from "@/components/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  MedicationRecord,
  MedicationRecords,
} from "@/types/medication-records";
import { shortDateTimeFormat } from "@/utils/timeFormatting";
import { useModal } from "@/components/providers/ModalProvider";
import RecordModal from "@/components/Modals/RecordModal";
import StatusBadge from "@/components/StatusBadge";
import { BadgeType } from "@/types/badge-type";

type Props = {
  params: {
    clientId: string;
    medicationId: string;
  };
};

const STATUS_MAPPING: Record<MedicationRecord["status"], string> = {
  awaiting: "In afwachting",
  not_taken: "Niet ingenomen",
  taken: "Ingenomen",
};

const STATUS_TYPE_MAPPING: Record<MedicationRecord["status"], BadgeType> = {
  awaiting: "Warning",
  not_taken: "Danger",
  taken: "Success",
};

const Page: FunctionComponent<Props> = ({
  params: { clientId, medicationId },
}) => {
  const { data, pagination, isFetching } = useMedicationRecords(+medicationId);
  const columns = useMemo<ColumnDef<MedicationRecord>[]>(() => {
    return [
      {
        accessorKey: "time",
        header: "Tijd",
        cell: (info) => shortDateTimeFormat(info.row.original.time),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <StatusBadge
            text={STATUS_MAPPING[info.row.original.status]}
            type={STATUS_TYPE_MAPPING[info.row.original.status]}
          />
        ),
      },
      {
        accessorKey: "reason",
        header: "Reden",
      },
    ];
  }, []);

  const { open } = useModal(RecordModal);

  return (
    <Panel title={`Medicatiegegevens`}>
      {data && (
        <PaginatedTable
          data={data}
          isFetching={isFetching}
          columns={columns}
          page={pagination.page}
          onPageChange={pagination.setPage}
          onRowClick={(record) => {
            if (record.status === "awaiting") {
              open({
                record,
                medicationId: +medicationId,
                clientId: +clientId,
              });
            }
          }}
        />
      )}
    </Panel>
  );
};

export default Page;
