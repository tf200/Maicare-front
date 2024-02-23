"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import {
  EMERGENCY_DISTANCE_OPTIONS,
  EMERGENCY_RELATION_OPTIONS,
} from "@/consts";
import { useCreateEmergencyContact } from "@/utils/emergency/createEmergencyContact";
import Button from "@/components/buttons/Button";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import { useRouter } from "next/navigation";

type PropsType = {
  clientId: string;
};

type FormTypes = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  relationship: string;
  relation_status: string;
  address: string;
  auto_reports: boolean;
};

const initialValues: FormTypes = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  relationship: "",
  relation_status: "",
  address: "",
  auto_reports: false,
};

export const EmergencyContactForm: FunctionComponent<PropsType> = ({
  clientId,
}) => {
  const { mutate, isLoading } = useCreateEmergencyContact(parseInt(clientId));

  const router = useRouter();

  const submit = useCallback(
    (values: FormTypes) => {
      mutate(values, {
        onSuccess: () => {
          formik.resetForm();
          router.push(`/clients/${clientId}/client-network/emergency`);
        },
      });
    },
    [mutate]
  );

  const formik = useFormik<FormTypes>({
    initialValues: initialValues,
    validationSchema: Yup.object({
      first_name: Yup.string().required("Geef alstublieft een voornaam op"),
      last_name: Yup.string().required("Geef alstublieft een achternaam op"),
      email: Yup.string().required("Geef alstublieft een e-mailadres op"),
      phone_number: Yup.string().required(
        "Geef alstublieft een telefoonnummer op"
      ),
      relationship: Yup.string().required("Geef alstublieft een relatie op"),
      relation_status: Yup.string().required("Geef alstublieft een afstand op"),
      address: Yup.string().required("Geef alstublieft een adres op"),
      auto_reports: Yup.boolean(),
    }),
    onSubmit: submit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6.5">
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputField
          required={true}
          label={"Voornaam"}
          name={"first_name"}
          placeholder={"Voer Voornaam in"}
          type={"text"}
          value={formik.values.first_name}
          className="w-full xl:w-1/2"
          error={
            formik.touched.first_name && formik.errors.first_name
              ? formik.errors.first_name
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <InputField
          required={true}
          className={"w-full xl:w-1/2"}
          label={"Achternaam"}
          name={"last_name"}
          type={"text"}
          value={formik.values.last_name}
          placeholder={"Voer Achternaam in"}
          error={
            formik.touched.last_name && formik.errors.last_name
              ? formik.errors.last_name
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <InputField
        required={true}
        className={"w-full mb-4.5"}
        label={"E-mailadres"}
        name={"email"}
        type={"text"}
        value={formik.values.email}
        placeholder={"Voer e-mailadres in"}
        error={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />{" "}
      <InputField
        required={true}
        label={"Telefoonnummer"}
        name={"phone_number"}
        placeholder={"Voer telefoonnummer in"}
        type={"text"}
        value={formik.values.phone_number}
        className={"w-full mb-4.5"}
        error={
          formik.touched.phone_number && formik.errors.phone_number
            ? formik.errors.phone_number
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <Select
          required={true}
          label={"Relatie"}
          name={"relationship"}
          options={EMERGENCY_RELATION_OPTIONS}
          className="w-full xl:w-1/2"
          value={formik.values.relationship}
          error={
            formik.touched.relationship && formik.errors.relationship
              ? formik.errors.relationship
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Select
          required={true}
          label={"Afstand"}
          name={"relation_status"}
          options={EMERGENCY_DISTANCE_OPTIONS}
          className="w-full xl:w-1/2"
          value={formik.values.relation_status}
          error={
            formik.touched.relation_status && formik.errors.relation_status
              ? formik.errors.relation_status
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <InputField
        required={true}
        className={"w-full mb-4.5"}
        label={"Adres"}
        name={"address"}
        type={"text"}
        value={formik.values.address}
        placeholder={"Voer adres in"}
        error={
          formik.touched.address && formik.errors.address
            ? formik.errors.address
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <CheckBoxInputFieldThin
        className={"w-full mb-4.5"}
        label={"Rapporten automatisch naar dit contact versturen ?"}
        name={"auto_reports"}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button
        type={"submit"}
        disabled={isLoading}
        isLoading={isLoading}
        formNoValidate={true}
      >
        Contact Indienen
      </Button>
    </form>
  );
};

export default EmergencyContactForm;
