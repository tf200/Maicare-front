"use client";

import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";
import MaturityMatrixTable from "@/components/maturity_matrix";
import { SetDomainLevelReqDto } from "@/types/goals";
import { useClientLevels } from "@/utils/domains";
import { useSetDomainLevel, useUpdateDomainLevel } from "@/utils/goal";
import { useUpdateMaturityMatrixDomains } from "@/utils/maturity_matrix";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function MaturityMatrixPage({ params: { clientId } }) {
  const [selectedDomainLevels, setSelectedDomainLevels] = useState<SetDomainLevelReqDto[]>([]);
  const { mutate: updateDomainLevel } = useUpdateDomainLevel(clientId);
  const { mutate: setDomainLevel } = useSetDomainLevel(clientId);
  const { mutate: updateClientDomains } = useUpdateMaturityMatrixDomains(clientId);

  const [isSaving, setIsSaving] = useState(false);

  const DOMAIN_IDS = useMemo(() => {
    return Array.from(
      new Set([...selectedDomainLevels.map((domainLevel) => domainLevel.domain_id)])
    );
  }, [selectedDomainLevels]);

  return (
    <Panel
      title={"Maturity Matrix"}
      sideActions={
        <Button
          disabled={isSaving}
          onClick={async () => {
            setIsSaving(true);
            selectedDomainLevels.map((domainLevel) => {
              updateDomainLevel(domainLevel);
            });

            // Update Client Domains
            updateClientDomains(DOMAIN_IDS, {
              onSuccess: () => {
                // Reset Values
                setIsSaving(false);
                setSelectedDomainLevels([]); // reset changedDomains
                toast.success("Saved successfully");
              },
            });
          }}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      }
    >
      <div className="p-5">
        <MaturityMatrixTable
          clientId={clientId}
          onDomainLevelsChange={(domainLevels) => {
            setSelectedDomainLevels(domainLevels);
          }}
          // onChange={({ selectedDomains, isNew }) => {
          //   setSelectedDomainLevels((prev) => {
          //     // Handle removed client domains
          //     const index = prev.findIndex(
          //       (domainLevel) => domainLevel.domain_id === selectedDomains.domain_id
          //     );
          //     if (index === -1) {
          //       return [...prev, selectedDomains];
          //     } else {
          //       prev[index] = selectedDomains;
          //       return [...prev];
          //     }
          //   });
          // }}
        />
      </div>
    </Panel>
  );
}
