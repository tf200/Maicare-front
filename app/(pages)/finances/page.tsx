import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import { AllInvoicesList } from "@/components/InvoicesList";

const Page: FunctionComponent = () => {
  return (
    <Panel title={"Financiën"}>
      <AllInvoicesList />
    </Panel>
  );
};

export default Page;
