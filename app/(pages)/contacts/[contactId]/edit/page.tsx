"use client";

import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import OpContactForm from "@/components/forms/OpContactForms/OpContactForm";
import { useRouter } from "next/navigation";
import useSenderContact from "@/hooks/useSenderContact";

const Page: FunctionComponent = ({ params }: { params: { contactId: number } }) => {
  const router = useRouter();

  // get contact by id
  const { data, isLoading } = useSenderContact(+params.contactId);

  return (
    <>
      <Breadcrumb pageName={"Bijwerken Opdrachtgevers"} />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Bijwerken Opdrachtgevers"}>
          {isLoading ? (
            <div className="p-5">Loading...</div>
          ) : (
            <OpContactForm
              mode={"update"}
              initialData={data}
              id={data?.id}
              onSuccess={() => {
                router.replace("/contacts");
              }}
            />
          )}
        </Panel>
      </div>
    </>
  );
};

export default Page;
