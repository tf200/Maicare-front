"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { IncidentsFormType } from "@/types/incidents/incidents-form-type";
import { useCreateIncident } from "@/utils/new-incident/useCreateIncident";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import { useGetIncident } from "@/utils/incident/getIncident";
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
  const initialValues = {
    ...SuccessionInitital,
    ...AnalysisInitial,
    ...GeneralInfosInitial,
    ...ClientConsequencesInitial,
    ...IncidentInfosInitial,
  };
  const [errorOptionMessage, setErrorOptionMessage] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchedKey, setSearchedKey] = useState(null);

  const { data: EmployeeData, isLoading: isSearching } = useEmployeesList({
    search: searchedKey,
    out_of_service: false,
  });

  const { data, isLoading: isDataLoading, isError } = useGetIncident(incidentId, clientId);

  const { mutate: create, isLoading: isCreating } = useCreateIncident(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchIncident(clientId);

  const onSubmit = useCallback(
    (values: IncidentsFormType) => {
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
        create(
          {
            ...values,
          },
          {
            onSuccess: () => {
              router.push(`/clients/${clientId}/incidents`);
            },
          }
        );
      }
    },
    [create, update]
  );

  if (mode == "edit") {
    if (!selectedEmployee) {
      setSelectedEmployee({ ...selectedEmployee, id: data?.reported_by });
    }
  }

  const FORMS = [
    { name: "GeneralInfos", component: GeneralInfos },
    { name: "IncidentInfos", component: IncidentInfos },
    { name: "Analysis", component: Analysis },
    { name: "ClientConsequences", component: ClientConsequences },
    { name: "Succession", component: Succession },
  ];

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        mode == "edit" ? (data ? data : initialValues) : { ...initialValues, client_id: clientId }
      }
      onSubmit={(values: IncidentsFormType) => {
        // if (!selectedEmployee) {
        //   setErrorOptionMessage("Geef alstublieft de melder.");
        //   return;
        // } else {
        setErrorOptionMessage("");
        let data = values;
        data.reported_by = selectedEmployee?.id;
        onSubmit(values);
        // }
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
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
              onClick={() => {
                if (!selectedEmployee) {
                  setErrorOptionMessage("Geef alstublieft de melder.");
                }
              }}
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
