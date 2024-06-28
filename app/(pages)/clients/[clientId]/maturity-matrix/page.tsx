"use client";

import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";
import ClientMaturityMatrix from "@/components/maturity_matrix";

export default function MaturityMatrixPage() {
  return (
    <Panel title={"Maturity Matrix"}>
      <div className="p-5">
        <ClientMaturityMatrix clientId={11} />
      </div>
    </Panel>
  );
}
