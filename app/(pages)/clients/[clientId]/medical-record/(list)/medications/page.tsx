"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useMedicationsList } from "@/utils/medications/getMedicationsList";
import { ColumnDef } from "@tanstack/table-core";
import { MedicationsResDto } from "@/types/medications/medications-res-dto";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import LinkButton from "@/components/buttons/LinkButton";
import DetailCell from "@/components/DetailCell";
import PaginatedTable from "@/components/PaginatedTable";
import router from "next/router";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteMedication } from "@/utils/medications/deleteMedication";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import Link from "next/link";
import PencilSquare from "@/components/icons/PencilSquare";
import { fullDateFormat } from "@/utils/timeFormatting";

type Props = {
  params: { clientId: string };
};

const MedicationsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { data, pagination, isLoading, isFetching, isError } =
    useMedicationsList(parseInt(clientId));

  const columnDef = useMemo<ColumnDef<MedicationsResDto>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Naam",
      },
      {
        accessorKey: "dosage",
        header: "Dosering",
      },
      {
        accessorKey: "frequency",
        header: "Frequentie",
      },
      {
        accessorKey: "administered_by",
        header: "Beheerd door",
      },
      {
        accessorKey: "start_date",
        header: "Startdatum",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "end_date",
        header: "Einddatum",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "self_administered",
        header: "Zelf toegediend ?",
        cell: (info) => (
          <div className="flex justify-center">
            <input
              className="w-[20px] h-[20px] cursor-pointer"
              type="checkbox"
              checked={info.getValue() as boolean}
            />
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Voeg een Medicatie toe"}
          href={"../medications/new"}
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
          renderRowDetails={({ original }) => <RowDetails clientId={parseInt(clientId)} data={original} />}
        />
      )}
      {isError && (
        <p role="alert" className="text-red">
          Sorry, een fout heeft ons verhinderd de medicatielijst te laden.
        </p>
      )}
    </>
  );
};

export default MedicationsPage;

type RowDetailsProps = {
  data: MedicationsResDto;
  clientId: number
};

const RowDetails: FunctionComponent<RowDetailsProps> = ({ data, clientId }) => {
  const {
    mutate: deleteMedication,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteMedication(data.client);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze medicatie wilt verwijderen?",
      title: "Medicatie Verwijderen",
    })
  );

  return (
    <div className={"grid grid-cols-3 gap-2"}>
      <DetailCell label={"Naam"} value={data.name} />
      <DetailCell label={"Dosering"} value={data.dosage} />
      <DetailCell label={"Frequentie"} value={data.frequency} />
      <DetailCell label={"Startdatum"} value={data.start_date} />
      <DetailCell label={"Einddatum"} value={data.end_date} />
      <DetailCell
        className={"col-span-3"}
        label={"Notities"}
        value={data.notes}
      />
      <div className="flex gap-4">
        <IconButton
          buttonType="Danger"
          onClick={() => {
            open({
              onConfirm: () => {
                deleteMedication(data.id);
              },
            });
          }}
          disabled={isDeleted}
          isLoading={isDeleting}
        >
          {isDeleted ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </IconButton>
        <Link href={`/clients/${clientId}/medications/${data.id}/edit`}>
          <IconButton>
            <PencilSquare className="w-5 h-5" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};
