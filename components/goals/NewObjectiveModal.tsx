import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import ObjectiveForm from "@/components/goals/ObjectiveForm";

const NewObjectiveModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  return (
    <FormModal {...props} title={"Nieuw Objectief"}>
      <ObjectiveForm
        goalId={additionalProps.goalId}
        clientId={additionalProps.clientId}
        onSuccess={props.onClose}
      />
    </FormModal>
  );
};

export default NewObjectiveModal;
