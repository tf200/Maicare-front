import React, { FunctionComponent } from "react";
import { GoalsListItem } from "@/types/goals";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useDeleteGoal } from "@/utils/goal/deleteGoal";
import Button from "@/components/buttons/Button";
import styles from "@/app/(pages)/clients/[clientId]/goals/styles.module.scss";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import PencilSquare from "@/components/icons/PencilSquare";
import UpdateObjectiveModal from "@/components/goals/UpdateObjectiveModal";
import UpdateGoalModal from "@/components/goals/UpdateGoalModal";
import NewObjectiveModal from "@/components/goals/NewObjectiveModal";
import ObjectiveProgressModal from "@/components/goals/ObjectiveProgressModal";
import Icon from "../Icon";
import { cn } from "@/utils/cn";
import { useMaturityMatrixDetails } from "@/utils/domains";

const GoalDetails: FunctionComponent<{
  goal: GoalsListItem;
  maturityMatrixId: string;
}> = ({ goal, maturityMatrixId }) => {
  const {
    mutate: deleteGoal,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteGoal(goal.client_id);

  const { data: matrixDetails, isLoading, isError, error } = useMaturityMatrixDetails(parseInt(maturityMatrixId as string));
  const { open: openObjectiveModal } = useModal(UpdateObjectiveModal);
  const { open: updateGoalModal } = useModal(UpdateGoalModal);
  const { open: newObjectiveModal } = useModal(NewObjectiveModal);
  const { open: deleteGoalModal } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit doel wilt verwijderen?",
      title: "Doel verwijderen",
    })
  );
  const { open: openObjectiveProgressModal } = useModal(ObjectiveProgressModal);

  return (
    <div>
      <div className="mb-6 ">
        <h3 className="flex justify-between text-lg font-bold mb-4">
          <span>Objectieven</span>
          {!goal.is_approved && !matrixDetails?.is_archived && (
            <Button
              className={styles.button}
              onClick={() => {
                newObjectiveModal({
                  goalId: goal.id,
                  clientId: goal.client_id,
                });
              }}
            >
              Nieuwe Objectief Toevoegen
            </Button>
          )}
        </h3>
        <ul className="flex flex-col gap-4">
          {goal.objectives.map((objective) => (
            <li
              key={objective.id}
              className={cn(
                "flex px-4 py-2 rounded-lg shadow items-center border-dashed border-1 bg-white"
              )}
            >
              <div className="font-bold flex-grow">
                <Icon name="move-right" /> {objective.title}
              </div>
            
              { goal.is_approved &&  (
                <>
                  <div className="mr-2">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        openObjectiveProgressModal({
                          objectiveId: objective.id,
                          objectiveTitle: objective.title,
                          objective,
                          clientId: goal.client_id,
                          maturityMatrixId,
                          is_archived: matrixDetails?.is_archived,
                        });
                      }}
                      className={cn(
                        "text-left flex flex-grow justify-between items-center rounded-full w-9 h-9 p-1 "
                      )}
                    >
                      <Icon name="line-chart" />
                    </IconButton>
                  </div>
                </>
              )}
              { !matrixDetails?.is_archived && (
                <div className="mr-2">
                    <IconButton
                      onClick={() => {
                        openObjectiveModal({
                          objective,
                          goalId: goal.id,
                          clientId: goal.client_id,
                          isArchived: matrixDetails?.is_archived,
                        });
                      }}
                      className="text-left flex flex-grow justify-between items-center disabled:opacity-80"
                    >
                      <PencilSquare className="w-5 h-5" />
                    </IconButton>
                </div>
              )}
                
              <div
                // onClick={(e) => {
                //   e.stopPropagation();
                //   openObjectiveProgressModal({
                //     objectiveId: objective.id,
                //     objectiveTitle: objective.title,
                //     objective,
                //     clientId: goal.client_id,
                //   });
                // }}
                className="border border-stroke rounded-full w-10 h-10 text-center leading-10 bg-meta-5/10 font-bold hover:bg-meta-5/40"
              >
                {objective.rating}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 justify-end items-center">
        { !matrixDetails?.is_archived && (
          <>
            <IconButton
              buttonType="Danger"
              onClick={(e) => {
                e.stopPropagation();
                deleteGoalModal({
                  onConfirm: () => {
                    deleteGoal(goal.id);
                  },
                });
              }}
              disabled={isDeleted}
              isLoading={isDeleting}
            >
              {isDeleted ? <CheckIcon className="w-5 h-5" /> : <TrashIcon className="w-5 h-5" />}
            </IconButton>
            {/* <QuestionnaireDownloadButton type="goals_and_objectives_content" questId={+maturityMatrixId} /> */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                updateGoalModal({ goal });
              }}
            >
              <PencilSquare className="w-5 h-5" />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalDetails;
