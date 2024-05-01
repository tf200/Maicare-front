import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import ProgressChart from "@/components/Charts/ProgressChart";
import { useGoalHistory, useObjectiveHistory } from "@/utils/goal";
import Loader from "@/components/common/Loader";
import Button from "@/components/buttons/Button";
import ObjectiveReportModal from "@/components/goals/ObjectiveReportModal";
import { useModal } from "@/components/providers/ModalProvider";

const ObjectiveProgressModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const { data, isLoading } = useObjectiveHistory(additionalProps.objectiveId);
  const { open: openReportModal } = useModal(ObjectiveReportModal);
  return (
    <FormModal {...props} title={"Objectieve vooruitgang"}>
      {/* add weekly report*/}
      <Button
        onClick={() => {
          openReportModal({
            clientId: additionalProps.clientId,
            objectiveId: additionalProps.objectiveId,
          });
        }}
      >
        <span>Voeg wekelijkse rapportage toe</span>
      </Button>
      <div className="p-4 bg-white rounded">
        {data && <ProgressChart data={data} />}
        {isLoading && <Loader />}
      </div>
    </FormModal>
  );
};

export default ObjectiveProgressModal;
