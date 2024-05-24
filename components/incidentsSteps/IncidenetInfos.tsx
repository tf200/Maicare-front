import React from "react";
import Select from "../FormFields/Select";
import {
  YES_NO_OPTIONS,
  RISK_OF_RECURRENCE_OPTIONS,
  SEVERITY_OF_INCIDENT_OPTIONS,
  TYPES_INCIDENT_OPTIONS,
} from "@/consts";
import * as Yup from "yup";
import Panel from "../Panel";
import Textarea from "../FormFields/Textarea";

export const IncidentInfosShema = {
  incident_type: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  passing_away: Yup.string().required("Selecteer minstens één betrokken kind."),
  self_harm: Yup.string().required("Selecteer minstens één betrokken kind."),
  violence: Yup.string().required("Selecteer minstens één betrokken kind."),
  fire_water_damage: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  accident: Yup.string().required("Selecteer minstens één betrokken kind."),
  client_absence: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  medicines: Yup.string().required("Selecteer minstens één betrokken kind."),
  organization: Yup.string().required("Selecteer minstens één betrokken kind."),
  use_prohibited_substances: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  other_notifications: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  incident_explanation: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  incident_prevent_steps: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
  incident_taken_measures: Yup.string().required(
    "Selecteer minstens één betrokken kind."
  ),
};

export default function IncidentInfos({
  handleChange,
  values,
  handleBlur,
  touched,
  errors,
}) {
  return (
    <Panel title={"2. Infromatie over het incident"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <Select
          label={"Type incident"}
          name="incident_type"
          id="incident_type"
          value={values.incident_type || ""}
          required={true}
          options={TYPES_INCIDENT_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.incident_type && errors.incident_type}
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={"Overlijden"}
            name="passing_away"
            id="passing_away"
            value={values.passing_away || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.passing_away && errors.passing_away}
          />
          <Select
            label={"Zelfbeschadiging"}
            name="self_harm"
            id="self_harm"
            value={values.self_harm || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.self_harm && errors.self_harm}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label={"Agressie/geweld"}
            name="violence"
            id="violence"
            value={values.violence || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.violence && errors.violence}
          />
          <Select
            label={"Brand- en waterschade"}
            name="fire_water_damage"
            id="fire_water_damage"
            value={values.fire_water_damage || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fire_water_damage && errors.fire_water_damage}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={"Ongevallen"}
            name="accident"
            id="accident"
            value={values.accident || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.accident && errors.accident}
          />
          <Select
            label={"Afwezigheid client"}
            name="client_absence"
            id="client_absence"
            value={values.client_absence || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.client_absence && errors.client_absence}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={"Medicijnen"}
            name="medicines"
            id="medicines"
            value={values.medicines || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.medicines && errors.medicines}
          />
          <Select
            label={"Organisatie"}
            name="organization"
            id="organization"
            value={values.organization || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.organization && errors.organization}
          />
          <Select
            className="my-4"
            label={"Gebruik verboden middelen"}
            name="use_prohibited_substances"
            id="use_prohibited_substances"
            value={values.use_prohibited_substances || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.use_prohibited_substances &&
              errors.use_prohibited_substances
            }
          />
          <Select
            className="my-4"
            label={"Overige meldingen"}
            name="other_notifications"
            id="other_notifications"
            value={values.other_notifications || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.other_notifications && errors.other_notifications}
          />
        </div>
      </div>
      <div className="px-6.5">
        <label className="font-bold">Ernst van incident en maatregelen</label>
        <Select
          className="my-4"
          label={"ernst incident"}
          name="severity_of_incident"
          id="severity_of_incident"
          value={values.severity_of_incident || ""}
          required={true}
          options={SEVERITY_OF_INCIDENT_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.use_prohibited_substances &&
            errors.use_prohibited_substances
          }
        />
        <Textarea
          className="mb-4"
          rows={2}
          id={"incident_explanation"}
          required={true}
          label={"Toelichting op het incident"}
          value={values.incident_explanation || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.incident_explanation && errors.incident_explanation}
        />
        <Select
          className="mb-4"
          label={"Is er risico op herhaling?"}
          name="recurrence_risk"
          id="recurrence_risk"
          value={values.recurrence_risk || ""}
          required={true}
          options={RISK_OF_RECURRENCE_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.recurrence_risk && errors.recurrence_risk}
        />

        <Textarea
          className="mb-4"
          rows={2}
          id={"incident_prevent_steps"}
          required={true}
          label={"Welke stappen zijin ondernomen om het incident te voorkomen"}
          value={values.incident_prevent_steps || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.incident_prevent_steps && errors.incident_prevent_steps
          }
        />

        <Textarea
          className="mb-4"
          rows={2}
          id={"incident_taken_measures"}
          required={true}
          label={
            "Welke maatregelen zijn genomen na het plaatsvinden van het incident"
          }
          value={values.incident_taken_measures || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.incident_taken_measures && errors.incident_taken_measures
          }
        />
      </div>
    </Panel>
  );
}
