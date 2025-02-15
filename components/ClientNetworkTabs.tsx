"use client";

import React, { FunctionComponent } from "react";
import { useParams, usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import PageTabs from "@/components/PageTabs";
import { useClientDetails } from "@/utils/clients/getClientDetails";

type Tab = {
  label: string;
  href: string;
};

const ClientNetworkTabs: FunctionComponent = () => {
  const { clientId } = useParams();
  const parsedId = typeof clientId === "string" && parseInt(clientId);
  const { data } = useClientDetails(parsedId);
  return (
    <PageTabs
      backHref={`/clients/${clientId}`}
      tabs={[
        {
          label: "Noodcontacten",
          href: `/clients/${clientId}/client-network/emergency`,
        },
        {
          label: "Betrokken medewerkers",
          href: `/clients/${clientId}/client-network/involved-employees`,
        },
      ]}
      title={`Cliëntennetwerk` + (data ? ` voor ${data.first_name} ${data.last_name}` : "")}
    />
  );
};

export default ClientNetworkTabs;
