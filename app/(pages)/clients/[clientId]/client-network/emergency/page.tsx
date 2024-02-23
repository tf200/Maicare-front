"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useEmergencyContactList } from "@/utils/emergency/getEmergencyContactList";
import { PAGE_SIZE } from "@/consts";
import Panel from "@/components/Panel";
import PaginatedTable from "@/components/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";
import { EmergencyContactsResDto } from "@/types/emergencyContacts/emergency-contacts-res-dto";
import LinkButton from "@/components/buttons/LinkButton";
type Props = {
  params: { clientId: string };
};

const EmergencyContactPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { pagination, isFetching, isLoading, isError, data } =
    useEmergencyContactList(+clientId);

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "first_name",
        header: () => "Voornaam",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "last_name",
        header: () => "Achternaam",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "email",
        header: () => "E-mailadres",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "phone_number",
        header: () => "Telefoonnummer",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "relationship",
        header: () => "Relatie",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "relation_status",
        header: () => "Afstand",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "address",
        header: () => "Adres",
        cell: (info) => info.getValue() || "Not Available",
      },
      {
        accessorKey: "auto_reports",
        header: () => "Automatische rapporten",
        cell: (info) => (
          <div className="flex justify-center">
            <input
              className="w-[20px] h-[20px]"
              type="checkbox"
              checked={info.getValue()}
              onChange={() => {}}
            ></input>
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
