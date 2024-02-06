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
          label: "Reports",
          href: `/clients/${clientId}/reports-record/reports`,
        },
        {
          label: "Measurements",
          href: `/clients/${clientId}/reports-record/measurements`,
        },
        {
          label: "Feedback",
          href: `/clients/${clientId}/reports-record/feedback`,
        },
        {
          label: "Observations",
          href: `/clients/${clientId}/reports-record/observations`,
        },
      ]}
      title={
        `Reports History` +
        (data ? ` for ${data.first_name} ${data.last_name}` : "")
      }
    />
  );
};

export default ReportsHistoryTabs;
