import React, { FunctionComponent } from "react";
import { GoalsListItem } from "@/types/goals";
import { useModal } from "@/components/providers/ModalProvider";
import { getDangerActionConfirmationModal } from "@/components/Modals/DangerActionConfirmation";
import { useDeleteGoal } from "@/utils/goal/deleteGoal";
import GoalProgress from "@/components/GoalProgress";
import Button from "@/components/buttons/Button";
import styles from "@/app/(pages)/clients/[clientId]/goals/styles.module.scss";
import CheckboxItem from "@/components/FormFields/CheckboxItem";
import IconButton from "@/components/buttons/IconButton";
import CheckIcon from "@/components/icons/CheckIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import Link from "next/link";
import PencilSquare from "@/components/icons/PencilSquare";
import LinkButton from "@/components/buttons/LinkButton";
import UpdateObjectiveModal from "@/components/goals/UpdateObjectiveModal";
import UpdateGoalModal from "@/components/goals/UpdateGoalModal";
import NewObjectiveModal from "@/components/goals/NewObjectiveModal";

const GoalDetails: FunctionComponent<{
  goal: GoalsListItem;
}> = ({ goal }) => {
  const { open } = useModal(
    getDangerActionConfirmationModal({
      msg: "Weet je zeker dat je dit doel wilt verwijderen?",
      title: "Doel verwijderen",
    })
  );
  const {
    mutate: deleteGoal,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteGoal(goal.client_id);

  const { open: openObjectiveModal } = useModal(UpdateObjectiveModal);
  const { open: updateGoalModal } = useModal(UpdateGoalModal);
  const { open: newObjectiveModal } = useModal(NewObjectiveModal);
  return (
    <div>
      <GoalProgress goalId={goal.id} />
      <div className="mb-6 ">
        <h3 className="flex justify-between text-lg font-bold mb-4">
          <span>Objectieven</span>
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
        </h3>
        <ul className="flex flex-col gap-4">
          {goal.objectives.map((objective) => (
            <li
              key={objective.id}
              className="flex bg-white px-4 py-2 rounded shadow items-center"
            >
              <CheckboxItem label={""} checked={false} />
              <button
                onClick={() => {
                  openObjectiveModal({
                    objective,
                  });
                }}
                className="text-left flex flex-grow justify-between items-center"
              >
                <div>{objective.title}</div>
                <div className="border border-stroke rounded-full w-10 h-10 text-center leading-10 bg-meta-5/10 font-bold">
                  {objective.rating}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 justify-end items-center">
        <IconButton
          buttonType="Danger"
          onClick={(e) => {
            e.stopPropagation();
            open({
              onConfirm: () => {
                deleteGoal(goal.id);
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
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            updateGoalModal({ goal });
          }}
        >
          <PencilSquare className="w-5 h-5" />
        </IconButton>
        <LinkButton
          text={"Doelrapporten"}
          href={`/clients/${goal.client_id}/goals/${goal.id}/reports`}
        />
      </div>
    </div>
  );
};

export default GoalDetails;
