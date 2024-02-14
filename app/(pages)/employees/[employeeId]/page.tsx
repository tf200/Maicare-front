import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import EmployeeInformation from "@/components/EmployeeDetails/EmployeeInformation";
import IdentityDetails from "@/components/clientDetails/IdentityDetails";
import AddressDetails from "@/components/clientDetails/AddressDetails";
import LocationDetails from "@/components/clientDetails/LocationDetails";
import MedicalRecordSummary from "@/components/clientDetails/MedicalRecordSummary";
import EmployeeCertificationsSummary from "@/components/EmployeeDetails/EmployeeCertificationsSummary";
import DocumentsSummary from "@/components/clientDetails/DocumentsSummary";
import LinkButton from "@/components/buttons/LinkButton";
import ReportsSummary from "@/components/clientDetails/ReportsSummary";
import ContractsSummary from "@/components/clientDetails/ContractsSummary";

type Props = {
  params: {
    employeeId: string;
  };
};

{/* <LinkButton text={"Certificates"} href={`${employeeId}/certificates`} />
<LinkButton text={"Education"} href={`${employeeId}/education`} />
<LinkButton text={"Experience"} href={`${employeeId}/experience`} /> */}

const EmployeeDetailsPage: FunctionComponent<Props> = ({
  params: { employeeId },
}) => {
  return (
    <>
      <Breadcrumb pageName="Employee details" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <Panel title={"Employee Information"} containerClassName="px-7 py-4">
            <EmployeeInformation employeeId={parseInt(employeeId)} />
          </Panel>
          <Panel
            title={"Certificates"}
            containerClassName="px-7 py-4"
            // sideActions={
            //   <LinkButton
            //     text={"Full Contacts List"}
            //     href={`/clients/${clientId}/emergency`}
            //   />
            // }
          >
            <EmployeeCertificationsSummary employeeId={parseInt(employeeId)} />
          </Panel>
          {/* <Panel
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
          </Panel> */}
        </div>
        {/* <div className="flex flex-col gap-9">
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
        </div> */}
      </div>
    </>
  );
};

export default EmployeeDetailsPage;
