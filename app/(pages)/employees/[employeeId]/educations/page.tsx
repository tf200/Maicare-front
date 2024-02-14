"use client";

import React, { FunctionComponent } from "react";
import EmployeeBackground from "@/components/employeeBackground/EmployeeBackground";
import { useListEducations } from "@/utils/educations/listEducations";
import EducationsList from "@/components/employeeBackground/EducationsList";
import EducationForm from "@/components/forms/EducationForm";

type Props = {
  params: {
    employeeId: string;
  };
};

const EducationsPage: FunctionComponent<Props> = ({
  params: { employeeId },
}) => {
  const query = useListEducations(+employeeId);
  return (
    <EmployeeBackground
      title={"Educations"}
      addButtonText={"+ Add Education"}
      cancelText={"Cancel Adding Education"}
      errorText={"An Error occurred while fetching educations"}
      employeeId={+employeeId}
      query={query}
      ListComponent={EducationsList}
      FormComponent={EducationForm}
    />
  );
};

export default EducationsPage;
