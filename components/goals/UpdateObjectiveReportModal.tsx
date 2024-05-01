import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import ObjectiveReportForm from "@/components/goals/ObjectiveReportForm";
import { ObjectiveReportFormType, ObjectiveReportResDto } from "@/types/goals";

const ObjectiveReportModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const clientId: number = additionalProps.clientId;
  const objectiveId: number = additionalProps.objectiveId;
  const initialData: ObjectiveReportResDto = additionalProps.initialData;
  return (
    <FormModal {...props} title={"Objectieve rapport"}>
      <ObjectiveReportForm
        onSuccess={props.onClose}
        onCancel={props.onClose}
        clientId={clientId}
        objectiveId={objectiveId}
        mode={"update"}
        initialData={initialData}
      />
    </FormModal>
  );
};

export default ObjectiveReportModal;
