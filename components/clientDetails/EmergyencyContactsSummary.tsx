import React, { FunctionComponent } from "react";

type Props = {
  clientId: string;
};

const EmergencyContactsSummary: FunctionComponent<Props> = ({ clientId }) => {
  return <div>EMERGENCY CONTACTS FOR CLIENT OF ID {clientId}</div>;
};

export default EmergencyContactsSummary;
