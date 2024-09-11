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
import { RegistrationFormType } from "@/types/questionnaire/registration-form";
import { useDeleteRegistrationForm } from "@/utils/questionnairs/registration-form/useDeleteRegistrationForm";
import { useGetAllRegistrationForms } from "@/utils/questionnairs/registration-form/useGetAllRegistrationForm";

import { fullDateFormat } from "@/utils/timeFormatting";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { FunctionComponent, useMemo } from "react";

type Props = {
  params: { clientId: string };
};
const RegistrationForm: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { mutate: deleteRegistrationForm } = useDeleteRegistrationForm(parseInt(clientId));
  const { data, pagination, isError, isLoading, isFetching } = useGetAllRegistrationForms(
    parseInt(clientId)
  );

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u dit registratieformulier wilt verwijderen?",
      title: "Registratieformulier verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<RegistrationFormType>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "naam",
      },
      {
        accessorKey: "date_of_birth",
        header: "geboortedatum",
      },
      {
        accessorKey: "gender",
        header: "geslacht",
      },
      {
        accessorKey: "email",
        header: "e-mail",
      },
      {
        accessorKey: "phone_number",
        header: "telefoonnummer",
      },
      {
        accessorKey: "created",
        header: "gecreëerd",
        cell: (info) => fullDateFormat(info.getValue() as string),
      },
      {
        accessorKey: "action",
        header: "Acties",
        cell: (info) => {
          return (
            <div className="flex gap-3">
              <Link
                href={`/clients/${clientId}/questionnaire/registration-form/${info.row.id}/edit`}
              >
                <IconButton>
                  <PencilSquare className="w-5 h-5" />
                </IconButton>
              </Link>
              <QuestionnaireDownloadButton type="youth_care_application" questId={+info.row.id} />
              <IconButton
                className="bg-red-600"
                onClick={() => {
                  return open({
                    onConfirm: () => {
                      deleteRegistrationForm(parseInt(info.row.id));
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
      title={"Registratieformulier"}
      sideActions={
        <LinkButton
          text="nieuwe Registratieformulier"
          href={"./registration-form/add"}
          className="ml-auto"
        />
      }
    >
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
      <div className="flex flex-wrap justify-between items-center p-4"></div>
      {isError && (
        <p role="alert" className="text-red-600">
          Sorry, er is een fout opgetreden waardoor we dit niet konden laden.
        </p>
      )}
    </Panel>
  );
};
export default RegistrationForm;
