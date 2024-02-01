import React, { FunctionComponent } from "react";

type Props = {
  clientId: number;
};

const DocumentsSummary: FunctionComponent<Props> = ({ clientId }) => {
  return <div>DOCUMENTS FOR CLIENT OF ID {clientId}</div>;
};

export default DocumentsSummary;
