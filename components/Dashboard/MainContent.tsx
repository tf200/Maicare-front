"use client";
import React from "react";
import DashboardOverview from "@/components/DataStats/DashboardOverview";
import Panel from "@/components/Panel";
import {
  useAutomaticReports,
  useGenerateAutomaticReports,
} from "@/utils/automatic-reports";
import { dateFormat } from "@/utils/timeFormatting";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import InflowOutflow from "@/components/Charts/InflowOutflow";
import TopCareTypes from "@/components/Charts/TopCareTypes";
import Analytics from "@/components/DataStats/Analytics";

const MainContent: React.FC = () => {
  return (
    <>
      <DashboardOverview />
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Statistieken
        </h2>
        <Analytics />
      </div>
      {/*<FinancesOverview />*/}
      {/*<CareTypeRevenue />*/}
    </>
  );
};

export default MainContent;

const Client: React.FC<{ client: number }> = ({ client }) => {
  const { data } = useClientDetails(client);
  return (
    <>
      {data && (
        <div className={"my-2"}>
          <strong>
            {data.first_name} {data.last_name}
          </strong>
          <div>{data.email}</div>
        </div>
      )}
    </>
  );
};

const FinancesOverview: React.FC = () => {
  return (
    <Panel title="Financiën" containerClassName="px-4 py-7" className={"mb-6"}>
      <InflowOutflow />
    </Panel>
  );
};

const CareTypeRevenue: React.FC = () => {
  return (
    <Panel
      title="Top zorgtypes"
      containerClassName="px-4 py-7 flex justify-center"
      className="max-w-2xl"
    >
      <TopCareTypes />
    </Panel>
  );
};
