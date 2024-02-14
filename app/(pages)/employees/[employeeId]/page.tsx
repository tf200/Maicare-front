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
      <Breadcrumb pageName="Employee details" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <Panel title={"Employee Information"} containerClassName="px-7 py-4">
            <EmployeeInformation employeeId={parseInt(employeeId)} />
          </Panel>
          <Panel
            title={"Certificates"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Full Certificates List"}
                href={`/employees/${employeeId}/certificates`}
              />
            }
          >
            <EmployeeCertificationsSummary employeeId={parseInt(employeeId)} />
          </Panel>
        </div>
        <div className="flex flex-col gap-9">
          <Panel
            title={"Educations"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Full Educations List"}
                href={`/employees/${employeeId}/educations`}
              />
            }
          >
            <EmployeeEducationsSummary employeeId={parseInt(employeeId)} />
          </Panel>
          <Panel
            title={"Experiences"}
            containerClassName="px-7 py-4"
            sideActions={
              <LinkButton
                text={"Full Experiences List"}
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
