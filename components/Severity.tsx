import React, { FunctionComponent } from "react";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import StatusBadge, { BadgeType } from "@/components/StatusBadge";

type Props = {
  severity: DiagnosisSeverity;
};

const Severity: FunctionComponent<Props> = ({ severity }) => {
  console.log(severity);
  return (
    <StatusBadge
      text={severity}
      type={
        (
          {
            Mild: "Success",
            Moderate: "Warning",
            Severe: "Danger",
          } as Record<DiagnosisSeverity, BadgeType>
        )[severity]
      }
    />
  );
};

export default Severity;
