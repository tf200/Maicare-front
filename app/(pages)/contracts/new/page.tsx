import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";

const Page: FunctionComponent = () => {
  return (
    <>
      <Breadcrumb pageName="Nieuw contract" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <Panel title={"Creëer een Nieuw Contract"}></Panel>
      </div>
    </>
  );
};

export default Page;
