import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import GoalsForm from "@/components/forms/GoalsForm";

const NewGoalModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  return (
    <FormModal {...props} title={"Nieuw Doel"}>
      <GoalsForm
        mode="new"
        goalId={parseInt(additionalProps.clientId)}
        clientId={parseInt(additionalProps.clientId)}
      />
    </FormModal>
  );
};

export default NewGoalModal;
