"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";

const Finances = () => {
  return (
    <>
      <Breadcrumb pageName="Contracten" />
      <Panel
        title={"Contracten"}
        sideActions={
          <LinkButton href={"/contracts/new"} text="Nieuw contract" />
        }
      ></Panel>
    </>
  );
};

export default Finances;
