"use client";

import React, { FunctionComponent, useMemo } from "react";
import { ColumnDef } from "@tanstack/table-core";
import Pagination from "@/components/Pagination";
import { PAGE_SIZE } from "@/consts";
import Loader from "@/components/common/Loader";
import Table from "@/components/Table";
import LinkButton from "@/components/buttons/LinkButton";
import { useObservationsList } from "@/utils/observations/getObservationslList";
import { ObservationsResDto } from "@/types/observations/observations-res-dto";
import PaginatedTable from "@/components/PaginatedTable";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useDeleteObservations } from "@/utils/observations/deleteObservation";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import Link from "next/link";
import PencilSquare from "@/components/icons/PencilSquare";

type Props = {
  params: { clientId: string };
};

const ObservationsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { data, pagination, isLoading, isFetching, isError } = useObservationsList(
    parseInt(clientId)
  );

  const {
    mutate: deleteObservation,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteObservations(+clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze observatie wilt verwijderen?",
      title: "Observatie Verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<ObservationsResDto>[]>(() => {
    return [
      {
        accessorKey: "date",
        header: "Datum",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "observation_text",
        header: "Observatie",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "category",
        header: "Categorie",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "id",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-center gap-4">
            <IconButton
              buttonType="Danger"
              onClick={() => {
                open({
                  onConfirm: () => {
                    deleteObservation(info.getValue() as number);
                  },
                });
              }}
              disabled={isDeleted}
              isLoading={isDeleting}
            >
              {isDeleted ? <CheckIcon className="w-5 h-5" /> : <TrashIcon className="w-5 h-5" />}
            </IconButton>
            <Link href={`/clients/${clientId}/observations/${info.getValue() as number}/edit`}>
              <IconButton>
                <PencilSquare className="w-5 h-5" />
              </IconButton>
            </Link>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center p-4">
        <LinkButton
          text={"Observaties Toevoegen"}
          href={"../observations/new"}
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
        <p role="alert" className="text-red-600">
          Sorry, een fout heeft ons verhinderd de medicatielijst te laden.
        </p>
      )}
    </>
  );
};

export default ObservationsPage;
