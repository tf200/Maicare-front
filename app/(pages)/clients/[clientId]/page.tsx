import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import ClientInformation from "@/components/clientDetails/ClientInformation";
import IdentityDetails from "@/components/clientDetails/IdentityDetails";
import AddressDetails from "@/components/clientDetails/AddressDetails";
import LocationDetails from "@/components/clientDetails/LocationDetails";
import MedicalRecordSummary from "@/components/clientDetails/MedicalRecordSummary";
import EmergencyContactsSummary from "@/components/clientDetails/EmergyencyContactsSummary";
import DocumentsSummary from "@/components/clientDetails/DocumentsSummary";
import LinkButton from "@/components/buttons/LinkButton";
import ReportsSummary from "@/components/clientDetails/ReportsSummary";
import ContractsSummary from "@/components/clientDetails/ContractsSummary";

type Props = {
  params: { clientId: string };
};

const ClientDetailsPage: FunctionComponent<Props> = ({
  params: { clientId },
}) => {
  return (
    <>
      <Breadcrumb pageName="Client details" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <Panel title={"Client Information"} containerClassName="px-7 py-4">
            <ClientInformation clientId={parseInt(clientId)} />
          </Panel>
          <Panel title={"Location Details"} containerClassName="px-7 py-4">
            <LocationDetails clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Emergency Contacts"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Full Contacts List"}
                href={`/clients/${clientId}/emergency`}
              />
            }
          >
            <EmergencyContactsSummary clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Contracts"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"View Client Contracts"}
                href={`${clientId}/contracts`}
              />
            }
          >
            <ContractsSummary clientId={parseInt(clientId)} />
          </Panel>
        </div>
        <div className="flex flex-col gap-9">
          <Panel title={"Identity Details"} containerClassName="px-7 py-4">
            <IdentityDetails clientId={parseInt(clientId)} />
          </Panel>
          <Panel title={"Address Details"} containerClassName="px-7 py-4">
            <AddressDetails clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Medical Record"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Full Medical Record"}
                href={`${clientId}/medical-record`}
              />
            }
          >
            <MedicalRecordSummary clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Reports"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Full Reports"}
                href={`${clientId}/reports-record/reports`}
              />
            }
          >
            <ReportsSummary clientId={parseInt(clientId)} />
          </Panel>
          <Panel
            title={"Documents"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Full Documents"}
                href={`${clientId}/document`}
              />
            }
          >
            <DocumentsSummary clientId={parseInt(clientId)} />
          </Panel>
        </div>
      </div>
    </>
  );
};

export default ClientDetailsPage;
