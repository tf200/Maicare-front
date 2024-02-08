"use client";

import React, { FunctionComponent } from "react";
import LinksGroup from "@/components/buttons/LinksGroup";
import { useParams } from "next/navigation";

const MedicalRecordLinkGroup: FunctionComponent = () => {
  const { clientId } = useParams();
  return (
    <LinksGroup
      options={[
        {
          label: "Overview",
          href: `/clients/${clientId}/medical-record`,
          getIsActive: (pathname, href) => pathname === href,
        },
        {
          label: "List",
          href: `/clients/${clientId}/medical-record/diagnosis`,
          getIsActive: (pathname) => {
            return (
              pathname.startsWith(
                `/clients/${clientId}/medical-record/diagnosis`
              ) ||
              pathname.startsWith(
                `/clients/${clientId}/medical-record/medications`
              ) ||
              pathname.startsWith(
                `/clients/${clientId}/medical-record/allergies`
              )
            );
          },
        },
      ]}
    />
  );
};

export default MedicalRecordLinkGroup;
