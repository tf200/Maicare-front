"use client";

import React, { FunctionComponent } from "react";
import ExperiencesList from "@/components/employeeBackground/ExperiencesList";
import ExperienceForm from "@/components/forms/ExperienceForm";
import { useListExperiences } from "@/utils/experiences/list-experiences";
import EmployeeBackground from "@/components/employeeBackground/EmployeeBackground";

type Props = {
  params: {
    employeeId: string;
  };
};

const ExperiencesPage: FunctionComponent<Props> = ({
  params: { employeeId },
}) => {
  const query = useListExperiences(+employeeId);
  return (
    <EmployeeBackground
      title={"Ervaringen"}
      addButtonText={"+ Ervaring Toevoegen"}
      cancelText={"Toevoegen Ervaring Annuleren"}
      errorText={"Een fout trad op tijdens het ophalen van ervaringen."}
      employeeId={+employeeId}
      query={query}
      ListComponent={ExperiencesList}
      FormComponent={ExperienceForm}
    />
  );
};

export default ExperiencesPage;
