import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import GoalsForm from "@/components/goals/GoalsForm";

const NewGoalModal: FunctionComponent<ModalProps> = ({ additionalProps, ...props }) => {
  return (
    <FormModal {...props} title={"Nieuw Doel"}>
      <GoalsForm
        mode="new"
        clientId={parseInt(additionalProps.clientId)}
        onSuccess={() => {
          props.onClose();
        }}
      />
    </FormModal>
  );
};

export default NewGoalModal;
