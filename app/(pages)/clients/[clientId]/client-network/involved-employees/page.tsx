"use client";

import React, { FunctionComponent, useMemo } from "react";
import Table from "@/components/Table";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useInvolvedEmployeesList } from "@/utils/involved-employees/getInvolvedEmployeesList";
import { PAGE_SIZE } from "@/consts";
import Panel from "@/components/Panel";
import dayjs from "dayjs";
import "dayjs/locale/en";
import PaginatedTable from "@/components/PaginatedTable";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useDeleteInvolvedEmployee } from "@/utils/involved-employees/deleteInvolvedEmployee";
import PencilSquare from "@/components/icons/PencilSquare";
import LinkButton from "@/components/buttons/LinkButton";

type Props = {
  params: { clientId: string };
};

const InvolvedEmployeesPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  const { pagination, isFetching, isLoading, isError, data } =
    useInvolvedEmployeesList(parseInt(clientId));

  const {
    mutate: deleteInvolved,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteInvolvedEmployee(+clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je deze betrokken medewerker wilt verwijderen?",
      title: "Betrokkenheid Verwijderen",
    })
  );

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "employee_name",
        header: () => "Medewerker",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "role",
        header: () => "Relatie",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "start_date",
        header: () => "Startdatum",
        cell: (info) =>
          dayjs(info.getValue()).format("DD MMM, YYYY") || "Niet Beschikbaar",
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
                    deleteInvolved(info.getValue());
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
            <Link
              href={`/clients/${clientId}/involved-employees/${info.getValue() as number}/edit`}
            >
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
    <Panel
      title={"Betrokken Medewerkerslijst"}
      sideActions={
        <LinkButton
          text="Medewerker toevoegen"
          href={`/clients/${clientId}/involved-employees/new`}
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

export default InvolvedEmployeesPage;
