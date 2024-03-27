"use client";

import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";

const PlanDetails: FunctionComponent<{
  params: {
    planId: string;
  };
}> = ({ params: { planId } }) => {
  return (
    <Panel title={"Zorgplan"} className="px-7 py-4">
      <h2>Zorgplan: # {planId}</h2>
    </Panel>
  );
};

export default PlanDetails;
