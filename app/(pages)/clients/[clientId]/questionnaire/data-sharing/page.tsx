"use client";
import IconButton from "@/components/buttons/IconButton";
import LinkButton from "@/components/buttons/LinkButton";
import Loader from "@/components/common/Loader";
import DeleteIcon from "@/components/icons/DeleteIcon";
import PencilSquare from "@/components/icons/PencilSquare";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import PaginatedTable from "@/components/PaginatedTable";
import Panel from "@/components/Panel";
import { useModal } from "@/components/providers/ModalProvider";
import { DataSharingType } from "@/types/questionnaire/data-sharing";
import { useDeleteDataSharing } from "@/utils/questionnairs/data-sharing/useDeleteDataSharing";
import { useGetAllDataSharing } from "@/utils/questionnairs/data-sharing/useGetAllDataSharing";
import { fullDateFormat } from "@/utils/timeFormatting";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { FunctionComponent, useMemo } from "react";

type Props = {
  params: { clientId: string };
};
const DataSharing: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { mutate: deleteDataSharing } = useDeleteDataSharing(parseInt(clientId));
  const { data, pagination, isError, isLoading, isFetching } = useGetAllDataSharing(
    parseInt(clientId)
  );

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze verklaring over het delen van gegevens wilt verwijderen?",
      title: "Verklaring voor het delen van gegevens verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<DataSharingType>[]>(() => {
    return [
      {
        accessorKey: "youth_name",
        header: "Jeugd naam",
      },
      {
        accessorKey: "parent_guardian_name",
        header: "Naam ouder / voogd",
      },

      {
        accessorKey: "data_description",
        header: "Gegevensbeschrijving",
      },
      {
        accessorKey: "parent_guardian_signature_name",
        header: "Huidige woonsituatie",
      },
      {
        accessorKey: "juvenile_name",
        header: "Handtekening van oudervoogd",
      },
      {
        accessorKey: "created",
        header: "Gemaakt",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "action",
        header: "Acties",
        cell: (info) => {
          return (
            <div className="flex gap-3">
              <Link href={`/clients/${clientId}/questionnaire/data-sharing/${info.row.id}/edit`}>
                <IconButton>
                  <PencilSquare className="w-5 h-5" />
                </IconButton>
              </Link>

              <IconButton
                className="bg-red"
                onClick={() => {
                  return open({
                    onConfirm: () => {
                      deleteDataSharing(parseInt(info.row.id));
                    },
                  });
                }}
              >
                <DeleteIcon className="w-5 h-5" />
              </IconButton>
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <Panel
      title={"Verklaring over het delen van gegevens"}
      sideActions={
        <LinkButton
          text="nieuwe verklaring over gegevensuitwisseling"
          href={"./data-sharing/add"}
          className="ml-auto"
        />
      }
    >
      {isLoading && <Loader />}
      {data && (
        <PaginatedTable
          className="bg-white"
          data={data}
          columns={columnDef}
          page={pagination.page ?? 1}
          isFetching={isFetching}
          onPageChange={(page) => pagination.setPage(page)}
        />
      )}
      <div className="flex flex-wrap justify-between items-center p-4"></div>
      {isError && (
        <p role="alert" className="text-red">
          Sorry, er is een fout opgetreden waardoor we dit niet konden laden.
        </p>
      )}
    </Panel>
  );
};
export default DataSharing;
