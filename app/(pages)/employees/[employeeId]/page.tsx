import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Panel from "@/components/Panel";
import EmployeeInformation from "@/components/EmployeeDetails/EmployeeInformation";
import EmployeeCertificationsSummary from "@/components/EmployeeDetails/EmployeeCertificationsSummary";
import EmployeeEducationsSummary from "@/components/EmployeeDetails/EmployeeEducationsSummary";
import EmployeeExperiencesSummary from "@/components/EmployeeDetails/EmployeeExperiencesSummary";
import LinkButton from "@/components/buttons/LinkButton";

type Props = {
  params: {
    employeeId: string;
  };
};

const EmployeeDetailsPage: FunctionComponent<Props> = ({
  params: { employeeId },
}) => {
  return (
    <>
      <Breadcrumb pageName="Medewerkerdetails" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <Panel title={"Medewerkerinformatie"} containerClassName="px-7 py-4">
            <EmployeeInformation employeeId={parseInt(employeeId)} />
          </Panel>
          <Panel
            title={"Certificaten"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Volledige Certificatenlijst"}
                href={`/employees/${employeeId}/certificates`}
              />
            }
          >
            <EmployeeCertificationsSummary employeeId={parseInt(employeeId)} />
          </Panel>
        </div>
        <div className="flex flex-col gap-9">
          <Panel
            title={"Opleidingen"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Volledige Opleidingenlijst"}
                href={`/employees/${employeeId}/educations`}
              />
            }
          >
            <EmployeeEducationsSummary employeeId={parseInt(employeeId)} />
          </Panel>
          <Panel
            title={"Ervaringen"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Volledige Ervaringenlijst"}
                href={`/employees/${employeeId}/experiences`}
              />
            }
          >
            <EmployeeExperiencesSummary employeeId={parseInt(employeeId)} />
          </Panel>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetailsPage;
