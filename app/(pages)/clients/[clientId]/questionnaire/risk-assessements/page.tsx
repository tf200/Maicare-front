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
import { RiskAssessementType } from "@/types/questionnaire/risk-assessments-type";
import { useDeleteRiskAssessements } from "@/utils/questionnairs/risk-assessements/useDeleteRiskAssessemets";
import { useGetRiskAssessemets } from "@/utils/questionnairs/risk-assessements/useGetAllRiskAssessemets";
import { fullDateFormat } from "@/utils/timeFormatting";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { FunctionComponent, useMemo } from "react";

type Props = {
  params: { clientId: string };
};
const RiskAssessements: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const { mutate: deleteRiskAssessements } = useDeleteRiskAssessements(parseInt(clientId));
  const { data, pagination, isError, isLoading, isFetching } = useGetRiskAssessemets(
    parseInt(clientId)
  );

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u deze risicobeoordeling wilt verwijderen?",
      title: "Risicobeoordeling verwijderen",
    })
  );

  const columnDef = useMemo<ColumnDef<RiskAssessementType>[]>(() => {
    return [
      {
        accessorKey: "intaker_position_name",
        header: "Intaker positie naam",
      },
      {
        accessorKey: "family_situation",
        header: "familie situatie",
      },

      {
        accessorKey: "education_work",
        header: "onderwijs werk",
      },
      {
        accessorKey: "current_living_situation",
        header: "huidige woonsituatie",
      },
      {
        accessorKey: "personal_risk_factors",
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
                href={`/clients/${clientId}/questionnaire/risk-assessements/${info.row.id}/edit`}
              >
                <IconButton>
                  <PencilSquare className="w-5 h-5" />
                </IconButton>
              </Link>
              <QuestionnaireDownloadButton type="risk_assessment" questId={+info.row.id} />
              <IconButton
                className="bg-red-600"
                onClick={() => {
                  return open({
                    onConfirm: () => {
                      deleteRiskAssessements(parseInt(info.row.id));
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
      title={"Risicobeoordelingen"}
      sideActions={
        <LinkButton
          text="nieuwe risicobeoordelingen toevoegen"
          href={"./risk-assessements/add"}
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
export default RiskAssessements;
