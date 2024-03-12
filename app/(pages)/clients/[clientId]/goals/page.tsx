"use client";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import Panel from "@/components/Panel";
import "dayjs/locale/en";
import PaginatedTable from "@/components/PaginatedTable";
import LinkButton from "@/components/buttons/LinkButton";
import { useGoalsList } from "@/utils/goal/getGoalsList";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import Link from "next/link";
import PencilSquare from "@/components/icons/PencilSquare";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useModal } from "@/components/providers/ModalProvider";
import { useDeleteGoal } from "@/utils/goal/deleteGoal";
import { useDeleteGoalReport } from "@/utils/goal-reports/deleteGoalReport";
import RatingStars from "@/components/FormFields/RatingStars";
import { useGetGoal } from "@/utils/goal/getGoal";
import Table from "@/components/Table";

type Props = {
  params: { clientId: string };
};

const GoalsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const [goalId, setGoalId] = useState<number>(null);

  const {
    pagination,
    isFetching,
    isLoading: isListLoading,
    isError,
    data,
  } = useGoalsList(parseInt(clientId));

  const {
    data: GoalReportsData,
    isLoading: isGoalLoading,
    isError: isGetGoalError,
  } = useGetGoal(goalId, parseInt(clientId));

  const {
    mutate: deleteGoal,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteGoal(+clientId);

  useEffect(() => {
    if (isDeleted == true) {
      setGoalId(null);
    }
  }, [isDeleted]);

  const {
    mutate: deleteGoalReport,
    isLoading: isDeletingGoalReport,
    isSuccess: isDeletedGoalReport,
  } = useDeleteGoalReport(+clientId);

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit doel wilt verwijderen?",
      title: "Doel verwijderen",
    })
  );

  const { open: openGoalReport } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet u zeker dat u het rapport van dit doel wilt verwijderen?",
      title: "VERWIJDER RAPPORT VAN DOEL",
    })
  );

  const columnDef = useMemo(() => {
    return [
      {
        accessorKey: "goal_name",
        header: () => "Doelen",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
      },
      {
        accessorKey: "rating",
        header: () => "Beoordeling",
        cell: (info) =>
          <RatingStars value={info.getValue()} /> || "Niet Beschikbaar",
      },
      {
        accessorKey: "goal_details",
        header: () => "Beschrijving",
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
                    deleteGoal(info.getValue());
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
            <Link href={`/clients/${clientId}/goals/${info.getValue()}/edit`}>
              <IconButton>
                <PencilSquare className="w-5 h-5" />
              </IconButton>
            </Link>
          </div>
        ),
      },
    ];
  }, []);

  const columnDefReport = useMemo(() => {
    return [
      {
        accessorKey: "title",
        header: () => "Titel",
        cell: (info) => info.getValue() || "Niet Beschikbaar",
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
    <div className="flex gap-12 w-full">
      <Panel
        className="w-full"
        title={"Doelenlijst"}
        sideActions={
          <LinkButton
            text={"Nieuw Doel Toevoegen"}
            href={`/clients/${clientId}/goals/new`}
          />
        }
      >
        {isListLoading && <div className="p-4 sm:p-6 xl:p-7.5">Loading...</div>}
        {data && (
          <PaginatedTable
            data={data}
            columns={columnDef}
            page={pagination.page ?? 1}
            isFetching={isFetching}
            onRowClick={(row) => {
              setGoalId(row.id);
            }}
            onPageChange={(page) => pagination.setPage(page)}
          />
        )}
        {isError && (
          <p role="alert" className="text-red">
            Er is een fout opgetreden.
          </p>
        )}
      </Panel>

      <Panel
        className="w-full"
        title={"Rapporten van het doel"}
        sideActions={
          goalId && (
            <LinkButton
              text={"Add Report To This Goal"}
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
          <Table
            data={GoalReportsData?.goals_report}
            columns={columnDefReport}
          />
        )}

        {isError && (
          <p role="alert" className="text-red">
            Er is een fout opgetreden.
          </p>
        )}
      </Panel>
    </div>
  );
};

export default GoalsPage;
