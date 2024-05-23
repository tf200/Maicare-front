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
  select1: Yup.string().required("Selecteer minstens één betrokken kind."),
  select2: Yup.string().required("Selecteer minstens één betrokken kind."),
  select3: Yup.string().required("Selecteer minstens één betrokken kind."),
  select4: Yup.string().required("Selecteer minstens één betrokken kind."),
  select5: Yup.string().required("Selecteer minstens één betrokken kind."),
  select6: Yup.string().required("Selecteer minstens één betrokken kind."),
  select7: Yup.string().required("Selecteer minstens één betrokken kind."),
  select8: Yup.string().required("Selecteer minstens één betrokken kind."),
  select9: Yup.string().required("Selecteer minstens één betrokken kind."),
  select10: Yup.string().required("Selecteer minstens één betrokken kind."),
  select11: Yup.string().required("Selecteer minstens één betrokken kind."),
  textArea1: Yup.string().required("Selecteer minstens één betrokken kind."),
  textArea2: Yup.string().required("Selecteer minstens één betrokken kind."),
  textArea3: Yup.string().required("Selecteer minstens één betrokken kind."),
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
          name="select1"
          id="select1"
          value={values.select1 || ""}
          required={true}
          options={TYPES_INCIDENT_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.select1 && errors.select1}
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={"Overlijden"}
            name="select2"
            id="select2"
            value={values.select2 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select2 && errors.select2}
          />
          <Select
            label={"Zelfbeschadiging"}
            name="select3"
            id="select3"
            value={values.select3 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select3 && errors.select3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label={"Agressie/geweld"}
            name="select4"
            id="select4"
            value={values.select4 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select4 && errors.select4}
          />
          <Select
            label={"Brand- en waterschade"}
            name="select5"
            id="select5"
            value={values.select5 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select5 && errors.select5}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={"Ongevallen"}
            name="select6"
            id="select6"
            value={values.select6 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select6 && errors.select6}
          />
          <Select
            label={"Afwezigheid client"}
            name="select7"
            id="select7"
            value={values.select7 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select7 && errors.select7}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label={"Medicijnen"}
            name="select8"
            id="select8"
            value={values.select8 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select8 && errors.select8}
          />
          <Select
            label={"Organisatie"}
            name="select9"
            id="select9"
            value={values.select9 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select9 && errors.select9}
          />
          <Select
            className="my-4"
            label={"Gebruik verboden middelen"}
            name="select10"
            id="select10"
            value={values.select10 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select10 && errors.select10}
          />
          <Select
            className="my-4"
            label={"Overige meldingen"}
            name="select11"
            id="select11"
            value={values.select11 || ""}
            required={true}
            options={YES_NO_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.select11 && errors.select11}
          />
        </div>
      </div>
      <div className="px-6.5">
        <label className="font-bold">Ernst van incident en maatregelen</label>
        <Select
          className="my-4"
          label={"ernst incident"}
          name="select12"
          id="select12"
          value={values.select12 || ""}
          required={true}
          options={SEVERITY_OF_INCIDENT_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.select10 && errors.select10}
        />
        <Textarea
          className="mb-4"
          rows={2}
          id={"textArea1"}
          required={true}
          label={"Toelichting op het incident"}
          value={values.textArea1 || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.textArea1 && errors.textArea1}
        />
        <Select
          className="mb-4"
          label={"Is er risico op herhaling?"}
          name="select11"
          id="select11"
          value={values.select13 || ""}
          required={true}
          options={RISK_OF_RECURRENCE_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.select11 && errors.select11}
        />

        <Textarea
          className="mb-4"
          rows={2}
          id={"textArea2"}
          required={true}
          label={"Welke stappen zijin ondernomen om het incident te voorkomen"}
          value={values.textArea2 || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.textArea2 && errors.textArea2}
        />

        <Textarea
          className="mb-4"
          rows={2}
          id={"textArea3"}
          required={true}
          label={
            "Welke maatregelen zijn genomen na het plaatsvinden van het incident"
          }
          value={values.textArea3 || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.textArea3 && errors.textArea3}
        />
      </div>
    </Panel>
  );
}
