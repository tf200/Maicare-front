import React, { FunctionComponent } from "react";
import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";
import DiagnosisSummary from "@/components/medicalRecordOverview/DiagnosisSummary";
import AllergiesSummary from "@/components/medicalRecordOverview/AllergiesSummary";
import MedicationsSummary from "@/components/medicalRecordOverview/MedicationsSummary";
import EpisodesSummary from "@/components/medicalRecordOverview/EpisodesSummary";

type Props = {
  params: { clientId: string };
};

const Page: FunctionComponent<Props> = ({ params: { clientId } }) => {
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <Panel
          title={"Diagnosis"}
          containerClassName="px-7 py-4"
          sideActions={
            <LinkButton
              text={"Full Diagnosis History"}
              href={`medical-record/diagnosis`}
            />
          }
        >
          <DiagnosisSummary clientId={parseInt(clientId)} />
        </Panel>
        <Panel
          title={"Medications"}
          containerClassName="px-7 py-4"
          sideActions={
            <LinkButton
              text={"Full Medications List"}
              href={`medical-record/medications`}
            />
          }
        >
          <MedicationsSummary clientId={parseInt(clientId)} />
        </Panel>
      </div>
      <div className="flex flex-col gap-9">
        <Panel
          title={"Allergies"}
          containerClassName="px-7 py-4"
          sideActions={
            <LinkButton
              text={"Full Allergies List"}
              href={`medical-record/allergies`}
            />
          }
        >
          <AllergiesSummary clientId={parseInt(clientId)} />
        </Panel>
        <Panel
          title={"Episodes"}
          containerClassName="px-7 py-4"
          sideActions={
            <LinkButton
              text={"Emotional State History"}
              href={`medical-record/episodes`}
            />
          }
        >
          <EpisodesSummary clientId={parseInt(clientId)} />
        </Panel>
      </div>
    </div>
  );
};

export default Page;
