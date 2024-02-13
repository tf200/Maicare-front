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
      <LinkButton text={"Education"} href={`${employeeId}/education`} />
      <LinkButton text={"Experience"} href={`${employeeId}/experience`} />
    </div>
  );
};

export default EmployeeDetailsPage;
