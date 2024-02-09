import React, { FunctionComponent, PropsWithChildren } from "react";
import ClientNetworkTabs from "@/components/ClientNetworkTabs";

type Props = {
  params: { clientId: string };
};

const MedicalRecordLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  params: { clientId },
}) => {
  return (
    <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <ClientNetworkTabs />
      {children}
    </div>
  );
};

export default MedicalRecordLayout;
