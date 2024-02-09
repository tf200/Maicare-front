import React, { FunctionComponent, PropsWithChildren } from "react";
import MedicalRecordLinkGroup from "@/components/MedicalRecordLinkGroup";

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <MedicalRecordLinkGroup />
      <div className="mb-6" />
      {children}
    </>
  );
};

export default Layout;
