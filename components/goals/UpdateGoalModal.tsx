import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import GoalsForm from "@/components/forms/GoalsForm";
import { GoalsListItem } from "@/types/goals";

const UpdateGoalModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const goal: GoalsListItem = additionalProps.goal;
  return (
    <FormModal {...props} title={"Doel bijwerken"}>
      <GoalsForm
        clientId={goal.client_id}
        mode={"edit"}
        initialData={goal}
        onSuccess={() => {
          props.onClose();
        }}
      />
    </FormModal>
  );
};

export default UpdateGoalModal;
