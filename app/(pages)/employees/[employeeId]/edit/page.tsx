import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EmployeeForm from "@/components/forms/EmployeeForm";

type PropsType = {
  params: { employeeId: string };
};

const UpdateEmployee: FunctionComponent<PropsType> = ({ params: { employeeId } }) => {
  return (
    <>
      <Breadcrumb pageName="Medewerker Bijwerken" />
      <EmployeeForm mode="edit" employeeId={parseInt(employeeId)} />
    </>
  );
};

export default UpdateEmployee;
