"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useEmergencyContactList } from "@/utils/emergency/getEmergencyContactList";
import { useDeleteEmergency } from "@/utils/emergency/deleteEmergencyContact";
import { usePatchEmergency } from "@/utils/emergency/patchEmergencyContact";
import { PAGE_SIZE } from "@/consts";
import Panel from "@/components/Panel";
import PaginatedTable from "@/components/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import { EmergencyContactsResDto } from "@/types/emergencyContacts/emergency-contacts-res-dto";
import LinkButton from "@/components/buttons/LinkButton";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
type Props = {
  params: { clientId: string };
};

const EmergencyContactPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { pagination, isFetching, isLoading, isError, data } =
    useEmergencyContactList(+clientId);

  const {
    mutate: deleteEmergency,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteEmergency(+clientId);

  const { mutate: updateEmergency, isLoading: isDataUpdating } =
    usePatchEmergency(+clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze noodsituatie wilt verwijderen?",
      title: "Noodsituatie Verwijderen",
    })
  );

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "first_name",
        header: () => "Voornaam",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "last_name",
        header: () => "Achternaam",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "email",
        header: () => "E-mailadres",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "phone_number",
        header: () => "Telefoonnummer",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "relationship",
        header: () => "Relatie",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "relation_status",
        header: () => "Afstand",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "address",
        header: () => "Adres",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "auto_reports",
        header: () => "Automatische rapporten",
        cell: (info) => (
          <div className="flex justify-center">
            <input
              className="w-[20px] h-[20px] cursor-pointer"
              type="checkbox"
              defaultChecked={info.getValue()}
              disabled={isDataUpdating}
              onChange={() => {
                updateEmergency({
                  auto_reports: !info.getValue(),
                  id: info?.cell?.row?.id,
                });
              }}
            ></input>
          </div>
        ),
      },
      {
        accessorKey: "id",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-center">
            <IconButton
              buttonType="Danger"
              onClick={() => {
                open({
                  onConfirm: () => {
                    deleteEmergency(info.getValue());
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
          </div>
        ),
      },
    ];
  }, []);

  return (
    <Panel
      title={"Lijst met Noodcontacten"}
      sideActions={
        <LinkButton
          text={"Nieuw noodcontact toevoegen"}
          href={`/clients/${clientId}/emergency/new`}
        />
      }
    >
      {isLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
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
        <p role="alert" className="text-red">
          Er is een fout opgetreden.
        </p>
      )}
    </Panel>
  );
};

export default EmergencyContactPage;
