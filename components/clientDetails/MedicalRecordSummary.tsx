import React, { FunctionComponent } from "react";

type Props = {
  clientId: string;
};

const MedicalRecordSummary: FunctionComponent<Props> = ({ clientId }) => {
  return <div>MEDICAL RECORD FOR USER OF ID {clientId}</div>;
};

export default MedicalRecordSummary;
