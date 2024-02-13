import React, { FunctionComponent } from "react";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import StatusBadge from "@/components/StatusBadge";
import { BadgeType } from "@/types/badge-type";

type Props = {
  severity: DiagnosisSeverity;
};

const mappingRecord: Record<DiagnosisSeverity, BadgeType> = {
  Mild: "Success",
  Moderate: "Warning",
  Severe: "Danger",
};

const Severity: FunctionComponent<Props> = ({ severity }) => {
  return <StatusBadge text={severity} type={mappingRecord[severity]} />;
};

export default Severity;
