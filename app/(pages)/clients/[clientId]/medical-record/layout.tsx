import React, { FunctionComponent, PropsWithChildren } from "react";
import PageTabs from "@/components/PageTabs";
import MedicalHistoryTabs from "@/components/MedicalHistoryTabs";

type Props = {
  params: { clientId: string };
};

const MedicalRecordLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  params: { clientId },
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <MedicalHistoryTabs />
      {children}
    </div>
  );
};

export default MedicalRecordLayout;
