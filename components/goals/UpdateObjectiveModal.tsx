import React, { FunctionComponent } from "react";
import FormModal from "@/components/Modals/FormModal";
import { ModalProps } from "@/types/modal-props";
import { ObjectiveItem } from "@/types/goals";
import ObjectiveForm from "@/components/goals/ObjectiveForm";

const UpdateObjectiveModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const objective: ObjectiveItem = additionalProps?.objective;
  return (
    <FormModal {...props} title={"Objectief"}>
      <ObjectiveForm
        goalId={additionalProps.goalId}
        clientId={additionalProps.clientId}
        mode="edit"
        initialData={objective}
        onSuccess={props.onClose}
      />
    </FormModal>
  );
};

export default UpdateObjectiveModal;
