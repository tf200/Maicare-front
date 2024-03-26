"use client";

import React, { FunctionComponent, useMemo } from "react";
import { useGetGoal } from "@/utils/goal/getGoal";
import { useDeleteGoalReport } from "@/utils/goal-reports/deleteGoalReport";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";
import Table from "@/components/Table";
import RatingStars from "@/components/FormFields/RatingStars";

const GoalReportPage: FunctionComponent<{
  params: { clientId: string; goalId: string };
}> = ({ params: { clientId, goalId } }) => {
  const {
    data: GoalReportsData,
    isLoading: isGoalLoading,
    isError: isGetGoalError,
  } = useGetGoal(+goalId, parseInt(clientId));

  const {
    mutate: deleteGoalReport,
    isLoading: isDeletingGoalReport,
    isSuccess: isDeletedGoalReport,
  } = useDeleteGoalReport(+clientId);

  const { open: openGoalReport } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u het rapport van dit doel wilt verwijderen?",
      title: "VERWIJDER RAPPORT VAN DOEL",
    })
  );

  const columnDefReport = useMemo(() => {
    return [
      {
        accessorKey: "title",
        header: () => "Titel",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "rating",
        header: () => "Beoordeling",
        cell: (info) =>
          <RatingStars value={info.getValue()} /> || "Niet Beschikbaar",
      },
      {
        accessorKey: "report_text",
        header: () => "Rapport",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "id",
        header: () => "",
        cell: (info) => (
          <div className="flex justify-center">
            <IconButton
              buttonType="Danger"
              onClick={() => {
                openGoalReport({
                  onConfirm: () => {
                    deleteGoalReport(info.getValue());
                  },
                });
              }}
              disabled={isDeletedGoalReport}
              isLoading={isDeletedGoalReport}
            >
              {isDeletedGoalReport ? (
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
      className="w-full"
      title={"Rapporten van het doel"}
      sideActions={
        goalId && (
          <LinkButton
            text={"Voeg rapport toe aan dit doel"}
            href={`/clients/${clientId}/goals/${GoalReportsData?.id}/reports/new`}
          />
        )
      }
    >
      {goalId ? (
        ""
      ) : (
        <p role="alert" className="text-black text-center pt-10">
          Selecteer doel om de rapporten te tonen
        </p>
      )}
      {GoalReportsData && (
        <Table data={GoalReportsData?.goals_report} columns={columnDefReport} />
      )}

      {GoalReportsData?.goals_report?.length === 0 && (
        <p role="alert" className="p-8">
          Geen rapporten beschikbaar
        </p>
      )}
      {isGetGoalError && (
        <p role="alert" className="text-red">
          Er is een fout opgetreden.
        </p>
      )}
    </Panel>
  );
};

export default GoalReportPage;
