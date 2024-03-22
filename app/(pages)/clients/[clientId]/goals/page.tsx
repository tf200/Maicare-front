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
import { useRouter } from "next/navigation";

type Props = {
  params: { clientId: string };
};

const GoalsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const [goalId, setGoalId] = useState<number>(null);
  const router = useRouter();
  const {
    pagination,
    isFetching,
    isLoading: isListLoading,
    isError,
    data,
  } = useGoalsList(parseInt(clientId));

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

  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit doel wilt verwijderen?",
      title: "Doel verwijderen",
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
              onClick={(e) => {
                e.stopPropagation();
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
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={`/clients/${clientId}/goals/${info.getValue()}/edit`}
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
            router.push(`/clients/${clientId}/goals/${row.id}/reports`);
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
  );
};

export default GoalsPage;
