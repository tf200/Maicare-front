import React, { FunctionComponent, PropsWithChildren } from "react";
import ReportsHistoryTabs from "@/components/ReportsHistoryTabs";

type Props = {
  params: { clientId: string };
};

const ReportsRecordLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  params: { clientId },
}) => {
  return (
    <div className="bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <ReportsHistoryTabs />
      {children}
    </div>
  );
};

export default ReportsRecordLayout;
