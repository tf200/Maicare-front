"use client";

import { ReportsListItem } from "@/types/reports/reports-list-res-dto";
import { useRouter } from "next/navigation";

import React, { FunctionComponent } from "react";
import Loader from "@/components/common/Loader";
import { useLatestReports } from "@/utils/reports/getLatestReports";
import { shortDateTimeFormat } from "@/utils/timeFormatting";

type Props = {
  clientId: number;
};

const ReportsSummary: FunctionComponent<Props> = ({ clientId }) => {
  const { data, isLoading, isError } = useLatestReports(clientId, 5);

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red-600">Een fout heeft ons verhinderd gegevens te laden.</div>;
  if (!data) return <div>Geen gegevens opgehaald.</div>;

  if (data?.length === 0) return <div>Nog geen rapporten</div>;

  return (
    <ul className="flex flex-col gap-2">
      {data?.map((report, i) => (
        <>
          <ReportsItem key={i} reports={report} />
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
    <li className="grid grid-cols-3 px-4 py-2 cursor-pointer hover:bg-gray-3 rounded-2xl">
      <div className="font-medium text-gray-600">{shortDateTimeFormat(reports.date)}</div>
      <div className="col-span-2 text-gray-600 truncate">{reports.report_text}</div>
    </li>
  );
};
