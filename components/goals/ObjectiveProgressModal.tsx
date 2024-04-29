import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import ProgressChart from "@/components/Charts/ProgressChart";
import { useGoalHistory, useObjectiveHistory } from "@/utils/goal";
import Loader from "@/components/common/Loader";

const ObjectiveProgressModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const { data, isLoading } = useObjectiveHistory(additionalProps.objectiveId);
  return (
    <FormModal {...props} title={"Objectieve vooruitgang"}>
      <div className="p-4 bg-white rounded">
        {data && <ProgressChart data={data} />}
        {isLoading && <Loader />}
      </div>
    </FormModal>
  );
};

export default ObjectiveProgressModal;
