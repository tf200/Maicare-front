import React, { FunctionComponent } from "react";
import { Navigate, NavigateAction, ToolbarProps, View, Views } from "react-big-calendar";
import ToolbarButtonsGroup from "@/components/buttons/ToolbarButtonsGroup";

const Toolbar: FunctionComponent<ToolbarProps> = (props) => {
  return (
    <div className="flex items-center justify-between mb-4.5">
      <ToolbarButtonsGroup
        options={[
          {
            label: "Vorige",
            value: Navigate.PREVIOUS,
          },
          {
            label: "Vandaag",
            value: Navigate.TODAY,
          },
          {
            label: "Volgende",
            value: Navigate.NEXT,
          },
        ]}
        onOptionClicked={(option) => props.onNavigate(option.value as NavigateAction)}
      />
      {props.label}
      <ToolbarButtonsGroup
        options={[
          { label: "Dag", value: Views.DAY },
          { label: "Week", value: Views.WEEK },
          { label: "Maand", value: Views.MONTH },
        ]}
        selectedOption={props.view}
        onOptionClicked={(option) => props.onView(option.value as View)}
      />
    </div>
  );
};

export default Toolbar;
