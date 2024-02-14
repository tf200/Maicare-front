"use client";

import { ReportsListItem } from "@/types/reports/reports-list-res-dto";
import { useRouter } from "next/navigation";

import React, { FunctionComponent } from "react";
import Loader from "@/components/common/Loader";
import { useLatestReports } from "@/utils/reports/getLatestReports";

type Props = {
  clientId: number;
};

const ReportsSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useLatestReports(clientId, 5);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red">An error prevented us from loading data.</div>
    );
  if (!data) return <div>No data retrieved</div>;

  if (data?.length === 0) return <div>No reports yet</div>;

  return (
    <ul className="flex flex-col gap-2">
      {data?.map((report) => (
        <>
          <ReportsItem key={report.id} reports={report} />
        </>
      ))}
    </ul>
  );
};

export default ReportsSummary;

type ReportsItemProps = {
  reports: ReportsListItem;
};

const ReportsItem: FunctionComponent<ReportsItemProps> = ({ reports }) => {
  const router = useRouter();

  return (
    <li
      className="grid grid-cols-3 px-4 py-2 cursor-pointer hover:bg-gray-3 rounded-2xl"
      // onClick={() =>
      //   router.push(`/clients/${reports.client}/reports/${reports.id}`)
      // }
    >
      <div className="font-medium text-gray-600">{reports.date}</div>
      <div className="col-span-2 text-gray-600 truncate">
        {reports.report_text}
      </div>
    </li>
  );
};
