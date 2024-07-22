import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import ObjectiveReportForm from "@/components/goals/ObjectiveReportForm";
import { ObjectiveItem } from "@/types/goals";

const ObjectiveReportModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const clientId: number = additionalProps.clientId;
  const objectiveId: number = additionalProps.objectiveId;
  const objective: ObjectiveItem = additionalProps.objective;
  return (
    <FormModal {...props} title={"Objectieve rapport"}>
      <ObjectiveReportForm
        onSuccess={props.onClose}
        onCancel={props.onClose}
        clientId={clientId}
        objective={objective}
        maturityMatrixId={additionalProps.maturityMatrixId}
      />
    </FormModal>
  );
};

export default ObjectiveReportModal;
