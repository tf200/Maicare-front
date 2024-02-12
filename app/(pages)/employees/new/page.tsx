import React, { FunctionComponent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EmployeeForm from "@/components/forms/EmployeeForm";

const NewEmployeePage: FunctionComponent = () => {
  return (
    <>
      <Breadcrumb pageName="Create Employee" />
      <EmployeeForm />
    </>
  );
};

export default NewEmployeePage;
