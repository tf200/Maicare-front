"use client";

import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import Button from "@/components/buttons/Button";

const Page: FunctionComponent = (props) => {
  return (
    <Panel
      title={"Uitgaven"}
      sideActions={<Button className="px-4 py-2">{"Nieuwe uitgave"}</Button>}
    >
      <ExpensesList />
    </Panel>
  );
};

export default Page;

const ExpensesList: FunctionComponent = () => {
  return <div></div>;
};
