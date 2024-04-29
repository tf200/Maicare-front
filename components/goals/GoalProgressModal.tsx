import React, { FunctionComponent } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import ProgressChart from "@/components/Charts/ProgressChart";
import { useGoalHistory } from "@/utils/goal";
import Loader from "@/components/common/Loader";

const GoalProgressModal: FunctionComponent<ModalProps> = ({
  additionalProps,
  ...props
}) => {
  const { data, isLoading } = useGoalHistory(additionalProps.goalId);
  return (
    <FormModal {...props} title={"Doel Vooruitgang"}>
      <div className="p-4 bg-white rounded">
        {data && <ProgressChart data={data} />}
        {isLoading && <Loader />}
      </div>
    </FormModal>
  );
};

export default GoalProgressModal;
