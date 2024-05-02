"use client";
import React, { FunctionComponent, useMemo } from "react";
import Panel from "@/components/Panel";
import "dayjs/locale/en";
import PaginatedTable from "@/components/PaginatedTable";
import { useGoalsList } from "@/utils/goal/getGoalsList";
import { useModal } from "@/components/providers/ModalProvider";
import Button from "@/components/buttons/Button";
import NewGoalModal from "@/components/goals/NewGoalModal";
import { ColumnDef } from "@tanstack/react-table";
import { GoalsListItem } from "@/types/goals";
import styles from "./styles.module.scss";
import GoalDetails from "@/components/goals/GoalDetails";
import { useGetDomain } from "@/utils/domains";
import GoalProgressModal from "@/components/goals/GoalProgressModal";
import DomainLevels from "@/components/goals/DomainLevels";
import DetailCell from "@/components/DetailCell";
import SecureWrapper, { SecureFragment } from "@/components/SecureWrapper";
import { APPROVE_GOALS } from "@/consts";
import CheckIcon from "@/components/icons/CheckIcon";
import { cn } from "@/utils/cn";
import { useApproveGoal } from "@/utils/goal";
import Loader from "@/components/common/Loader";

type Props = {
  params: { clientId: string };
};

const GoalsPage: FunctionComponent<Props> = ({ params: { clientId } }) => {
  const {
    pagination,
    isFetching,
    isLoading: isListLoading,
    isError,
    data,
  } = useGoalsList(parseInt(clientId));

  const { open: openGoalProgressModal } = useModal(GoalProgressModal);
  const { mutate: approveGoal, isLoading: isApprovingGoal } = useApproveGoal(
    parseInt(clientId)
  );

  const columnDef = useMemo<ColumnDef<GoalsListItem>[]>(() => {
    return [
      {
        accessorKey: "item",
        header: () => "",
        cell: ({ row: { original: goal } }) => {
          return (
            <div>
              <h3 className="font-bold flex text-lg mb-6 justify-between">
                <div className="block">
                  <div>{goal.title}</div>
                  <Domain id={goal.domain_id} />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openGoalProgressModal({
                      goalId: goal.id,
                    });
                  }}
                  className="block border border-stroke rounded p-4 w-16 text-center bg-meta-5/10 font-bold"
                >
                  {goal.main_goal_rating}
                </button>
              </h3>
              <p>{goal.desc}</p>
              <div className="mb-6 mt-6 flex gap-4">
                <DetailCell
                  value={goal.created_by_name}
                  label={"Aangemaakt door"}
                />
                <DetailCell
                  value={goal.reviewed_by_name}
                  label={"Goedgekeurd door"}
                />
                {!goal.reviewed_by && (
                  <SecureFragment permission={APPROVE_GOALS}>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        approveGoal(goal.id);
                      }}
                      isLoading={isApprovingGoal}
                      className={cn(
                        "ml-auto self-center flex items-center gap-4",
                        styles.button
                      )}
                    >
                      <CheckIcon /> <div>keurt dit doel goed</div>
                    </Button>
                  </SecureFragment>
                )}
                {goal.reviewed_by && (
                  <div className="ml-auto text-primary font-bold flex items-center gap-2">
                    {/*  approved V*/}
                    <CheckIcon /> Goedgekeurd
                  </div>
                )}
              </div>
            </div>
          );
        },
      },
    ];
  }, []);

  const { open: openGoalModal } = useModal(NewGoalModal);

  return (
    <>
      <DomainLevels clientId={+clientId} />
      <Panel
        className="w-full"
        title={"Doelenlijst"}
        sideActions={
          <Button
            onClick={() => {
              openGoalModal({ clientId });
            }}
          >
            Nieuw Doel Toevoegen
          </Button>
        }
      >
        {isListLoading && (
          <div className="p-4 sm:p-6 xl:p-7.5">
            <Loader />
          </div>
        )}
        {data && (
          <PaginatedTable
            data={data}
            className={styles.table}
            columns={columnDef}
            page={pagination.page ?? 1}
            isFetching={isFetching}
            renderRowDetails={(row) => <GoalDetails goal={row.original} />}
            onPageChange={(page) => pagination.setPage(page)}
          />
        )}
        {isError && (
          <p role="alert" className="p-7 text-red">
            Er is een fout opgetreden.
          </p>
        )}
      </Panel>
    </>
  );
};

export default GoalsPage;

const Domain: FunctionComponent<{ id: number }> = ({ id }) => {
  const { data } = useGetDomain(id);
  return <div className="font-normal italic">{data?.name}</div>;
};
