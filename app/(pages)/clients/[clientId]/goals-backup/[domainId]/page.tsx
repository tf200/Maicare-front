"use client";

import Panel from "@/components/Panel";
import { useClientLevels, useDomains } from "@/utils/domains";

// This page is not used in the application yet
export default function ClientGoalsPage({
  params: { domainId, clientId },
}: {
  params: { domainId: number; clientId: number };
}) {
  const { data: domains, isLoading } = useDomains();
  const { data: clientLevels, isLoading: isLoadingClientLevels } = useClientLevels(clientId);

  if (isLoading || isLoadingClientLevels) {
    return "Loading...";
  }

  const client_domains = domains.filter((domain) =>
    clientLevels.some((clientLevel) => clientLevel.domain_id === domain.id)
  );

  return (
    <Panel title="Doelen">
      <div className="p-5">
        {client_domains.map((domain, index) => {
          const clientLevel = clientLevels.find(
            (clientLevel) => clientLevel.domain_id === domain.id
          );
          return (
            <div key={index}>
              <h2>{domain.name}</h2>
              <p>{clientLevel?.level}</p>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
