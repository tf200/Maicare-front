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

const MedicalHistoryTabs: FunctionComponent = () => {
  const { clientId } = useParams();
  const parsedId = typeof clientId === "string" && parseInt(clientId);
  const { data } = useClientDetails(parsedId);
  return (
    <PageTabs
      backHref={`/clients/${clientId}`}
      tabs={[
        {
          label: "Diagnose",
          href: `/clients/${clientId}/medical-record/diagnosis`,
        },
        {
          label: "Medicatie",
          href: `/clients/${clientId}/medical-record/medications`,
        },
        {
          label: "Allergieën",
          href: `/clients/${clientId}/medical-record/allergies`,
        },
        {
          label: "Episodes",
          href: `/clients/${clientId}/medical-record/episodes`,
        },
      ]}
      title={
        `Medische Geschiedenis` +
        (data ? ` voor ${data.first_name} ${data.last_name}` : "")
      }
    />
  );
};

export default MedicalHistoryTabs;
