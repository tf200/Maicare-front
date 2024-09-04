import React, { FunctionComponent, useState } from "react";
import { ModalProps } from "@/types/modal-props";
import FormModal from "@/components/Modals/FormModal";
import ProgressChart from "@/components/Charts/ProgressChart";
import { useObjectiveHistory } from "@/utils/goal";
import Loader from "@/components/common/Loader";
import Button from "@/components/buttons/Button";
import ObjectiveReportModal from "@/components/goals/ObjectiveReportModal";
import { useModal } from "@/components/providers/ModalProvider";
import ToolbarButtonsGroup from "@/components/buttons/ToolbarButtonsGroup";
import ObjectiveReports from "@/components/goals/ObjectiveReports";
import { ObjectiveItem } from "@/types/goals";
import objectiveReportModal from "@/components/goals/ObjectiveReportModal";
import WeeklyProgressChart from "@/components/Charts/WeeklyProgressChart";

type OptionType = "chart" | "reports_list";

const OPTIONS: {
  value: OptionType;
  label: string;
}[] = [
  {
    value: "chart",
    label: "Grafiek",
  },
  {
    value: "reports_list",
    label: "Rapporten",
  },
];

const ObjectiveProgressModal: FunctionComponent<ModalProps> = ({ additionalProps, ...props }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>(OPTIONS[0].value);
  const { data, isLoading } = useObjectiveHistory(additionalProps.objectiveId);
  const { open: openReportModal } = useModal(ObjectiveReportModal);
  const objective: ObjectiveItem = additionalProps.objective;
  return (
    <FormModal
      panelClassName={"max-w-280"}
      {...props}
      title={"Objectieve vooruitgang: " + objective.title}
    >
      <div className="flex items-center mb-6">
        <ToolbarButtonsGroup
          selectedOption={selectedOption}
          options={OPTIONS}
          onOptionClicked={(option) => {
            setSelectedOption(option.value as OptionType);
          }}
        />
        <Button
          className={"ml-auto"}
          onClick={() => {
            openReportModal({
              clientId: additionalProps.clientId,
              objectiveId: objective.id,
              objective,
              maturityMatrixId: additionalProps.maturityMatrixId,
            });
          }}
        >
          <span>Voeg wekelijkse rapportage toe</span>
        </Button>
      </div>
      {data && selectedOption === "chart" && (
        <div className="p-4 bg-white rounded">
          <WeeklyProgressChart data={data} />{" "}
        </div>
      )}
      {data && selectedOption === "reports_list" && (
        <ObjectiveReports
          data={data}
          clientId={additionalProps.clientId}
          objectiveId={additionalProps.objectiveId}
          objective={objective}
        />
      )}
      {isLoading && <Loader />}
    </FormModal>
  );
};

export default ObjectiveProgressModal;
