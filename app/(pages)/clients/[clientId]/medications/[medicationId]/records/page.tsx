"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useMedicationRecords } from "@/utils/medication-records";
import Panel from "@/components/Panel";
import PaginatedTable from "@/components/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import { MedicationRecord } from "@/types/medication-records";
import { dateFormat, shortDateTimeFormat } from "@/utils/timeFormatting";
import { useModal } from "@/components/providers/ModalProvider";
import MedicationRecordModal from "@/components/Modals/MedicationRecordModal";
import StatusBadge from "@/components/StatusBadge";
import { BadgeType } from "@/types/badge-type";
import { useGetMedication } from "@/utils/medications/getMedication";
import Loader from "@/components/common/Loader";
import DetailCell from "@/components/DetailCell";
import styles from "./styles.module.scss";

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

const Page: FunctionComponent<Props> = ({ params: { clientId, medicationId } }) => {
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
        header: "Reden (voor het geval niet genomen)",
      },
    ];
  }, []);

  const { open } = useModal(MedicationRecordModal);

  return (
    <Panel title={`Medicatiegegevens`}>
      <MedicationDetails medicationId={+medicationId} clientId={+clientId} />
      {data && (
        <PaginatedTable
          className={styles.table}
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

const MedicationDetails: FunctionComponent<{
  medicationId: number;
  clientId: number;
}> = ({ medicationId, clientId }) => {
  const { data, isLoading } = useGetMedication(medicationId, clientId);

  return (
    <div>
      {isLoading && <Loader />}
      {data && (
        <div className="flex gap-4 p-5">
          <DetailCell label={"Naam"} value={data.name} />
          <DetailCell label={"Dosering"} value={data.dosage} />
          <DetailCell label={"Startdatum"} value={dateFormat(data.start_date)} />
          <DetailCell label={"Einddatum"} value={dateFormat(data.end_date)} />
        </div>
      )}
    </div>
  );
};
