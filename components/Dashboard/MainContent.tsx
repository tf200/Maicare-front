"use client";
import React from "react";
import DashboardOverview from "@/components/DataStats/DashboardOverview";
import Panel from "@/components/Panel";
import {
  useAutomaticReports,
  useGenerateAutomaticReports,
} from "@/utils/automatic-reports";

const MainContent: React.FC = () => {
  return (
    <>
      <DashboardOverview />
      <AutomaticReports />
    </>
  );
};

export default MainContent;

const AutomaticReports: React.FC = () => {
  const { data, isLoading } = useAutomaticReports();
  const { mutate, isLoading: isGenerating } = useGenerateAutomaticReports();
  return (
    <>
      {data?.count > 0 && (
        <Panel title="Automatische Rapporten">
          {isLoading
            ? "Laden..."
            : data?.results.map((report) => (
                <div
                  key={report.id}
                  className={
                    "flex items-center justify-between px-7 py-4 border-b border-stroke dark:border-stroke-dark"
                  }
                >
                  {report.summary_text}
                </div>
              ))}
        </Panel>
      )}
      {/*{data?.count === 0 && (*/}
      {/*  <Panel title="Automatische Rapporten" containerClassName={"px-7 py-4"}>*/}
      {/*    <div>Er zijn geen automatische rapporten</div>*/}
      {/*    <Button*/}
      {/*      className={"mt-4"}*/}
      {/*      onClick={() => {*/}
      {/*        mutate();*/}
      {/*      }}*/}
      {/*      isLoading={isGenerating}*/}
      {/*    >*/}
      {/*      Genereer automatische rapporten*/}
      {/*    </Button>*/}
      {/*  </Panel>*/}
      {/*)}*/}
    </>
  );
};
