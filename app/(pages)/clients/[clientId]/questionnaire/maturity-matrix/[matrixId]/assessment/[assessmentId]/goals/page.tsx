"use client";
import React, { FunctionComponent, useMemo } from "react";
import Panel from "@/components/Panel";
import "dayjs/locale/en";
import { useGoalsList } from "@/utils/goal/getGoalsList";
import Button from "@/components/buttons/Button";
import { ColumnDef } from "@tanstack/react-table";
import { GoalsListItem } from "@/types/goals";
import styles from "./styles.module.scss";
import GoalDetails from "@/components/goals/GoalDetails";
import { useGetDomain, useGetSelectedAssessmentByGoalId, useMaturityMatrixDetails } from "@/utils/domains";
import DetailCell from "@/components/DetailCell";
import { SecureFragment } from "@/components/SecureWrapper";
import { APPROVE_GOALS } from "@/consts";
import CheckIcon from "@/components/icons/CheckIcon";
import { cn } from "@/utils/cn";
import { useApproveGoal } from "@/utils/goal";
import Loader from "@/components/common/Loader";
import { capitalizeFirstLetter, parseGoalIds } from "@/utils";
import Icon from "@/components/Icon";
import Table from "@/components/Table";

type MaturityMatrixGoalsPageProps = {
  params: { matrixId: string, assessmentId: string, clientId: string };
};

export default function MaturityMatrixGoalsPage ({
  params: { matrixId, assessmentId, clientId },
}: MaturityMatrixGoalsPageProps) {
  
  const { mutate: approveGoal, isLoading: isApprovingGoal } = useApproveGoal(parseInt(clientId), parseInt(matrixId));
  const { data: matrixDetails, isLoading, isError, error } = useMaturityMatrixDetails(parseInt(matrixId));
  const goals = matrixDetails?.selected_assessments.find((assessment)=>assessment.id === parseInt(assessmentId)).goals


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
                  <div>
                    <Icon name="flag-triangle-right" /> {capitalizeFirstLetter(goal.title)}
                  </div>
                  <Domain id={goal.domain_id} />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // openGoalProgressModal({
                    //   goalId: goal.id,
                    // });
                  }}
                  className="block border border-stroke rounded p-4 w-16 text-center bg-meta-5/10 font-bold"
                >
                  {goal.main_goal_rating}
                </button>
              </h3>
              <p>{goal.desc}</p>
              <div className="mb-6 mt-6 flex gap-4">
                <DetailCell value={goal.created_by_name} label={"Aangemaakt door"} />
                <DetailCell value={goal.reviewed_by_name} label={"Goedgekeurd door"} />
                {!goal.is_approved && (
                  <SecureFragment permission={APPROVE_GOALS}>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        approveGoal(goal.id);
                      }}
                      isLoading={isApprovingGoal}
                      className={cn("ml-auto self-center flex items-center gap-4", styles.button)}
                    >
                      <CheckIcon /> <div>keurt dit doel</div>
                    </Button>
                  </SecureFragment>
                )}
                {goal.is_approved && (
                  <div className="ml-auto text-meta-3 font-bold flex items-center gap-2">
                    {/*  approved V */}
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
  // log assessment
  // const { open: openGoalModal } = useModal(NewGoalModal);

  return (
    <>
      {/* <DomainLevels clientId={+clientId} /> */}
      <Panel className="w-full" title={"Doelenlijst"}>
        {!goals && (
          <div className="p-4 sm:p-6 xl:p-7.5">
            <Loader />
          </div>
        )}
        {goals && (
          <Table
            data={goals}
            className={styles.table}
            columns={columnDef}
            renderRowDetails={(row) => (
              <GoalDetails
                goal={row.original}
                maturityMatrixId={matrixId}
              />
            )}
          />
        )}
        {isError && (
          <p role="alert" className="p-7 text-red-600">
            Er is een fout opgetreden.
          </p>
        )}
      </Panel>
    </>
  );
};


const Domain: FunctionComponent<{ id: number }> = ({ id }) => {
  const { data } = useGetDomain(id);
  return <div className="font-normal italic">{data?.name}</div>;
};
