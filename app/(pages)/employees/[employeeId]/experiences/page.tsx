"use client";

import React, { FunctionComponent, useState } from "react";
import Button from "@/components/buttons/Button";
import Loader from "@/components/common/Loader";
import LargeErrorMessage from "@/components/LargeErrorMessage";
import Panel from "@/components/Panel";
import ExperiencesList from "@/components/employeeBackground/ExperiencesList";
import ExperienceForm from "@/components/forms/ExperienceForm";
import { useListExperiences } from "@/utils/experiences/list-experiences";

type Props = {
  params: {
    employeeId: string;
  };
};

const ExperiencesPage: FunctionComponent<Props> = ({
  params: { employeeId },
}) => {
  const { data, error, isLoading } = useListExperiences(+employeeId);
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Panel title={"Experiences"} containerClassName="py-4 px-7">
      <div className="mb-4.5">
        <Button
          className="w-72 block ml-auto"
          onClick={() => setIsAdding(true)}
        >
          + Add Experience
        </Button>
      </div>
      {isAdding && (
        <ExperienceForm
          employeeId={+employeeId}
          onSuccess={() => setIsAdding(false)}
        />
      )}
      {data && <ExperiencesList data={data} />}
      {isLoading && <Loader />}
      {error && (
        <LargeErrorMessage
          firstLine="Something went wrong"
          secondLine="An error occurred while fetching experiences"
        />
      )}
    </Panel>
  );
};

export default ExperiencesPage;
