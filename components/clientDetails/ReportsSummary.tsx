import React, { FunctionComponent } from "react";

type Props = {
  clientId: number;
};

const ReportsSummary: FunctionComponent<Props> = ({ clientId }) => {
  return <div>ReportsSummary FOR CLIENT OF ID {clientId}</div>;
};

export default ReportsSummary;
