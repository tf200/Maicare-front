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
import QuestionnaireDownloadButton from "@/components/QuestionnaireDownloadButton";
import { ConsentDeclarationType } from "@/types/questionnaire/consent-declaration-type";
import { useDeleteConsentDeclaration } from "@/utils/questionnairs/consent-declaration/useDeleteConsentDeclaration";
import { useGetAllConsentDeclaration } from "@/utils/questionnairs/consent-declaration/useGetAllConsentDeclaration";

import { fullDateFormat } from "@/utils/timeFormatting";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { FunctionComponent, useMemo } from "react";

type Props = {
  params: { clientId: string };
};
const ConsentDeclaration: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { mutate: deleteConsentDeclaration } = useDeleteConsentDeclaration(parseInt(clientId));
  const { data, pagination, isError, isLoading, isFetching } = useGetAllConsentDeclaration(
    parseInt(clientId)
  );

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze toestemmingsverklaring wilt verwijderen?",
      title: "Toestemmingsverklaring verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<ConsentDeclarationType>[]>(() => {
    return [
      {
        accessorKey: "youth_name",
        header: "Intaker positie naam",
      },
      {
        accessorKey: "parent_guardian_name",
        header: "familie situatie",
      },

      {
        accessorKey: "juvenile_name",
        header: "onderwijs werk",
      },
      {
        accessorKey: "representative_name",
        header: "huidige woonsituatie",
      },
      {
        accessorKey: "contact_phone_number",
        header: "persoonlijke risicofactoren ",
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
              <Link
                href={`/clients/${clientId}/questionnaire/consent-declaration/${info.row.id}/edit`}
              >
                <IconButton>
                  <PencilSquare className="w-5 h-5" />
                </IconButton>
              </Link>
              <QuestionnaireDownloadButton type="consent_declaration" questId={+info.row.id} />
              <IconButton
                className="bg-red-600"
                onClick={() => {
                  return open({
                    onConfirm: () => {
                      deleteConsentDeclaration(parseInt(info.row.id));
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
      title={"toestemmingsverklaring"}
      sideActions={
        <LinkButton
          text="nieuwe toestemmingsverklaring toevoegen"
          href={"./consent-declaration/add"}
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
        <p role="alert" className="text-red-600">
          Sorry, er is een fout opgetreden waardoor we dit niet konden laden.
        </p>
      )}
    </Panel>
  );
};
export default ConsentDeclaration;
