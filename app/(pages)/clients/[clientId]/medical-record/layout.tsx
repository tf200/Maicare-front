import React, { FunctionComponent, PropsWithChildren } from "react";
import LinksGroup from "@/components/buttons/LinksGroup";
import MedicalRecordLinkGroup from "@/components/MedicalRecordLinkGroup";

type Props = {
  params: { clientId: string };
};

const Layout: FunctionComponent<PropsWithChildren<Props>> = ({
  params: { clientId },
  children,
}) => {
  return (
    <>
      <MedicalRecordLinkGroup />
      <div className="mb-6" />
      {children}
    </>
  );
};

export default Layout;
