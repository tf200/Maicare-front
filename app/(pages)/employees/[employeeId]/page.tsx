"use client";
import React, { FunctionComponent, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EmployeeDetails from "@/components/EmployeeDetails";

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
      <EmployeeDetails employeeId={employeeId} />
    </>
  );
};

export default EmployeeDetailsPage;
