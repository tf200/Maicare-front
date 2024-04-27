import React, { FunctionComponent } from "react";
import FormModal from "@/components/Modals/FormModal";
import { ModalProps } from "@/types/modal-props";
import { ObjectiveItem } from "@/types/goals";

const ObjectiveModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const objective: ObjectiveItem = additionalProps?.objective;
  return (
    <FormModal {...props} title={"Objectief"}>
      <h2>
        <div>{objective.title}</div>
        <div>{objective.rating}</div>
      </h2>
      <p>{objective.desc}</p>
    </FormModal>
  );
};

export default ObjectiveModal;
