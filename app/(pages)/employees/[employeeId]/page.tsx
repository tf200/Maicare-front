import React, { FunctionComponent } from "react";
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
    <div>
      <LinkButton text={"Certificates"} href={`${employeeId}/certificates`} />
      <LinkButton text={"Educations"} href={`${employeeId}/educations`} />
      <LinkButton text={"Experiences"} href={`${employeeId}/experiences`} />
    </div>
  );
};

export default EmployeeDetailsPage;
