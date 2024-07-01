"use client";

import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import LinkButton from "@/components/buttons/LinkButton";
import ClientMaturityMatrix from "@/components/maturity_matrix";
import { SetDomainLevelReqDto } from "@/types/goals";
import { useUpdateDomainLevel } from "@/utils/goal";
import { useState } from "react";

export default function MaturityMatrixPage({ params: { clientId } }) {
  const [changedDomains, setChangedDomains] = useState<SetDomainLevelReqDto[]>([]);
  const { mutate: updateDomainLevel } = useUpdateDomainLevel(clientId);

  return (
    <Panel
      title={"Maturity Matrix"}
      sideActions={
        <Button
          onClick={() => {
            changedDomains.map((domainLevel) => {
              updateDomainLevel(domainLevel);
            });
            setChangedDomains([]); // reset changedDomains
          }}
        >
          Save
        </Button>
      }
    >
      <div className="p-5">
        <ClientMaturityMatrix
          clientId={clientId}
          onChange={(selectedDomains) => {
            setChangedDomains((prev) => {
              const index = prev.findIndex(
                (domainLevel) => domainLevel.domain_id === selectedDomains.domain_id
              );
              if (index === -1) {
                return [...prev, selectedDomains];
              } else {
                prev[index] = selectedDomains;
                return [...prev];
              }
            });
          }}
        />
      </div>
    </Panel>
  );
}
