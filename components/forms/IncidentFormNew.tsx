"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { useCreateIncident } from "@/utils/new-incident/useCreateIncident";
import { usePatchIncident } from "@/utils/incident/patchIncident";
import GeneralInfos, {
  GeneralInfosInitial,
  GeneralInfosShema,
} from "../incidentsSteps/GeneralInfos";
import IncidentInfos, {
  IncidentInfosInitial,
  IncidentInfosShema,
} from "../incidentsSteps/IncidenetInfos";
import Analysis, { AnalysisInitial, AnalysisShema } from "../incidentsSteps/Analysis";
import ClientConsequences, {
  ClientConsequencesInitial,
  ClientConsequencesShema,
} from "../incidentsSteps/ClientConsequences";
import Succession, { SuccessionInitital, SuccessionShema } from "../incidentsSteps/Succession";
import { NewIncidentType } from "@/types/incidents";
import { useGetIncident } from "@/utils/new-incident/useGetSingleIncident";

const formShema = Yup.object().shape({
  ...GeneralInfosShema,
  ...IncidentInfosShema,
  ...AnalysisShema,
  ...ClientConsequencesShema,
  ...SuccessionShema,
});

type Props = {
  clientId: number;
  incidentId?: number;
  mode: string;
};

const EpisodeForm: FunctionComponent<Props> = ({ clientId, incidentId, mode }) => {
  const router = useRouter();
  const initialValues: NewIncidentType = {
    ...SuccessionInitital,
    ...AnalysisInitial,
    ...GeneralInfosInitial,
    ...ClientConsequencesInitial,
    ...IncidentInfosInitial,
  };

  const { data: singleIncident, isLoading: isDataLoading } = useGetIncident(incidentId, clientId);
  const { mutate: create, isLoading: isCreating } = useCreateIncident(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchIncident(clientId);

  const onSubmit = useCallback(
    (values: NewIncidentType) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: incidentId,
          },
          {
            onSuccess: () => {
              router.push(`/clients/${clientId}/incidents`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            router.push(`/clients/${clientId}/incidents`);
          },
        });
      }
    },
    [create, update]
  );

  const FORMS = [
    { name: "GeneralInfos", component: GeneralInfos },
    { name: "IncidentInfos", component: IncidentInfos },
    { name: "Analysis", component: Analysis },
    { name: "ClientConsequences", component: ClientConsequences },
    { name: "Succession", component: Succession },
  ];

  if (mode == "edit" && isDataLoading) return <div className="mt-5">Loading...</div>;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        mode == "edit"
          ? singleIncident
            ? singleIncident
            : initialValues
          : { ...initialValues, client_id: clientId }
      }
      onSubmit={(values: NewIncidentType) => {
        onSubmit(values);
      }}
      validationSchema={formShema}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {FORMS.map(({ name, component: Component }) => (
                <Component
                  key={name}
                  handleChange={handleChange}
                  values={values}
                  handleBlur={handleBlur}
                  touched={touched}
                  errors={errors}
                />
              ))}
            </div>

            <Button
              type={"submit"}
              disabled={isCreating || isPatching || isDataLoading}
              isLoading={isCreating || isPatching || isDataLoading}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Update Incident" : "Create Incident"}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default EpisodeForm;
