import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";
import ContactsList from "@/components/ContactsList";

const Page: FunctionComponent = () => {
  return (
    <>
      <Breadcrumb pageName={"Opdrachtgevers"} />
      <Panel
        title={"Opdrachtgevers"}
        sideActions={<LinkButton href={"/contacts/new"} text={"Nieuw Opdrachtgever"} />}
      >
        <ContactsList />
      </Panel>
    </>
  );
};

export default Page;
