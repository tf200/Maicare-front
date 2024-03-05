"use client";

import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import OpContactForm from "@/components/forms/OpContactForms/OpContactForm";
import { useRouter } from "next/navigation";

const Page: FunctionComponent = () => {
  const router = useRouter();
  return (
    <>
      <Breadcrumb pageName={"Nieuw Opdrachtgevers"} />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Creëer een Nieuw Opdrachtgevers"}>
          <OpContactForm
            mode={"add"}
            onSuccess={() => {
              router.replace("/contacts");
            }}
          />
        </Panel>
      </div>
    </>
  );
};

export default Page;
