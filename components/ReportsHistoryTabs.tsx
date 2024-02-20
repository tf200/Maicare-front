"use client";

import React, { FunctionComponent } from "react";
import { useParams, usePathname } from "next/navigation";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import PageTabs from "./PageTabs";

const ReportsHistoryTabs: FunctionComponent = () => {
  const { clientId } = useParams();

  const parsedId = typeof clientId === "string" && parseInt(clientId);
  const { data } = useClientDetails(parsedId);

  return (
    <PageTabs
      backHref={`/clients/${clientId}`}
      tabs={[
        {
          label: "Rapporten",
          href: `/clients/${clientId}/reports-record/reports`,
        },
        {
          label: "Metingen",
          href: `/clients/${clientId}/reports-record/measurements`,
        },
        {
          label: "Feedback",
          href: `/clients/${clientId}/reports-record/feedback`,
        },
        {
          label: "Observaties",
          href: `/clients/${clientId}/reports-record/observations`,
        },
      ]}
      title={
        `Rapportagegeschiedenis` +
        (data ? ` voor ${data.first_name} ${data.last_name}` : "")
      }
    />
  );
};

export default ReportsHistoryTabs;
