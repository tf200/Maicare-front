"use client";

import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import CarePlanForm from "@/components/forms/CarePlanForm";
import { useCarePlan } from "@/utils/care-plans";

const PlanDetails: FunctionComponent<{
  params: {
    planId: string;
    clientId: string;
  };
}> = ({ params: { planId, clientId } }) => {
  const { data } = useCarePlan(+planId);
  return (
    <Panel title={"Zorgplan: #" + planId} containerClassName="px-7 py-4">
      {data && (
        <CarePlanForm
          onSuccess={() => {}}
          clientId={+clientId}
          mode={"update"}
          initialData={data}
        />
      )}
    </Panel>
  );
};

export default PlanDetails;
