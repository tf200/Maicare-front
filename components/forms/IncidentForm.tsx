"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { IncidentsFormType } from "@/types/incidents/incidents-form-type";
import { useCreateIncident } from "@/utils/incident/createIncident";
import ComboBox from "../ComboBox";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import ClientsTagInput from "../FormFields/ClientsTagInput";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import Select from "@/components/FormFields/Select";
import { INCIDENT_STATUS_OPTIONS } from "@/consts";
import { useGetIncident } from "@/utils/incident/getIncident";
import { usePatchIncident } from "@/utils/incident/patchIncident";

const initialValues: IncidentsFormType = {
  date_reported: "",
  date_of_incident: "",
  reported_by: 0,
  involved_children: [],
  location: "",
  description: "",
  action_taken: "",
  follow_up_required: false,
  follow_up_date: "",
  notes: "",
  status: "",
};

const incidentSchema: Yup.ObjectSchema<IncidentsFormType> = Yup.object().shape({
  date_reported: Yup.string().required(
    "Geef alstublieft de gerapporteerde datum."
  ),
  date_of_incident: Yup.string().required(
    "Geef alstublieft het tijdstip van het incident."
  ),
  reported_by: Yup.number(),
  reported_by_name: Yup.string(),
  involved_children: Yup.array().min(
    1,
    "Selecteer minstens één betrokken kind."
  ),
  involved_children_name: Yup.array(),
  location: Yup.string().required(
    "Geef alstublieft de locatie van het incident."
  ),
  description: Yup.string().required(
    "Geef alstublieft een beschrijving van het incident."
  ),
  action_taken: Yup.string().required("Geef alstublieft de ondernomen actie."),
  follow_up_required: Yup.boolean().required(
    "Geef aan of er een follow-up vereist is."
  ),
  follow_up_date: Yup.string().required(
    "Geef alstublieft de datum voor de follow-up."
  ),
  notes: Yup.string().required("Geef alstublieft notities."),
  status: Yup.string().required("Geef alstublieft de status."),
});

type Props = {
  clientId: number;
  incidentId?: number;
  mode: string;
};

const EpisodeForm: FunctionComponent<Props> = ({
  clientId,
  incidentId,
  mode,
}) => {
  const router = useRouter();

  const [errorOptionMessage, setErrorOptionMessage] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchedKey, setSearchedKey] = useState(null);

  const { data: EmployeeData, isLoading: isSearching } = useEmployeesList({
    search: searchedKey,
    out_of_service: false,
  });

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useGetIncident(incidentId, clientId);

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

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        mode == "edit"
          ? data
            ? data
            : initialValues
          : { ...initialValues, involved_children: [clientId] }
      }
      onSubmit={(values: IncidentsFormType) => {
        if (!selectedEmployee) {
          setErrorOptionMessage("Geef alstublieft de melder.");
          return;
        } else {
          setErrorOptionMessage("");
          let data = values;
          data.reported_by = selectedEmployee?.id;
          onSubmit(values);
        }
      }}
      validationSchema={incidentSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
        errors,
      }) => (
        <form onSubmit={handleSubmit} className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <InputField
              className={"w-full xl:w-1/2"}
              id={"date_reported"}
              required={true}
              label={"Gerapporteerde datum"}
              type={"date"}
              placeholder={"Voer de datum van het rapport in"}
              value={values.date_reported}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date_reported && errors.date_reported}
            />
            <InputField
              className={"w-full xl:w-1/2"}
              id={"date_of_incident"}
              required={true}
              label={"Datum en tijd van het incident"}
              type={"datetime-local"}
              value={values.date_of_incident}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date_of_incident && errors.date_of_incident}
            />
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <ComboBox
              className={"w-full xl:w-1/2"}
              placeholder="Search for employee"
              id="reported_by"
              label="Gemeld door"
              data={EmployeeData}
              isLoading={isSearching}
              setSelected={setSelectedEmployee}
              setSearchedKey={setSearchedKey}
              error={errorOptionMessage}
              setError={setErrorOptionMessage}
            />

            <ClientsTagInput
              className={"w-full xl:w-1/2"}
              label={"Betrokken kinderen"}
              id={"involved_children"}
              name={"involved_children"}
              placeholder={"Voer betrokken kinderen in"}
              required={true}
            />
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <InputField
              className={"w-full xl:w-1/2"}
              id={"location"}
              required={true}
              label={"Locatie van het incident"}
              placeholder="Voer de locatie van het incident in"
              type={"text"}
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && errors.location}
            />
            <InputField
              className={"w-full xl:w-1/2"}
              id={"follow_up_date"}
              required={true}
              label={"Datum voor follow-up"}
              type={"date"}
              value={values.follow_up_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.follow_up_date && errors.follow_up_date}
            />
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <Textarea
              rows={3}
              className={"w-full"}
              id={"action_taken"}
              required={true}
              placeholder="Voer genomen actie in"
              label={"Ondernomen actie"}
              value={values.action_taken}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.action_taken && errors.action_taken}
            />
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <Textarea
              rows={3}
              className={"w-full"}
              id={"description"}
              required={true}
              placeholder="Voer beschrijving in"
              label={"Beschrijving"}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && errors.description}
            />
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <Textarea
              rows={3}
              className={"w-full"}
              id={"notes"}
              required={true}
              placeholder="Voer notities in"
              label={"Opmerkingen"}
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.notes && errors.notes}
            />
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <Select
              label={"Selecteer Toestand"}
              name="status"
              id="status"
              value={values.status}
              className="w-full xl:w-1/2"
              required={true}
              options={INCIDENT_STATUS_OPTIONS}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.status && errors.status}
            />
          </div>

          <CheckBoxInputFieldThin
            className={"w-full mb-4.5"}
            label={"Follow-up vereist"}
            name={"follow_up_required"}
            id={"follow_up_required"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.follow_up_required}
          />

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
      )}
    </Formik>
  );
};

export default EpisodeForm;
