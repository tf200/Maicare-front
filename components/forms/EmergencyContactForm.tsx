"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { useFormik } from "formik";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Select from "@/components/FormFields/Select";
import { EMERGENCY_RELATION_OPTIONS } from "@/consts";
import { useCreateEmergencyContact } from "@/utils/emergency/createEmergencyContact";
import Button from "@/components/buttons/Button";

type PropsType = {
  clientId: string;
};

type FormTypes = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  relationship: string;
  address: string;
};

const initialValues: FormTypes = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  relationship: "",
  address: "",
};

export const EmergencyContactForm: FunctionComponent<PropsType> = ({
  clientId,
}) => {
  const { mutate, isLoading } = useCreateEmergencyContact(parseInt(clientId));
  const submit = useCallback(
    (values: FormTypes) => {
      mutate(values, {
        onSuccess: formik.resetForm,
      });
    },
    [mutate]
  );

  const formik = useFormik<FormTypes>({
    initialValues: initialValues,
    validationSchema: Yup.object({
      first_name: Yup.string().required("Please provide first name"),
      last_name: Yup.string().required("Please provide last name"),
      email: Yup.string().required("Please provide email address"),
      phone_number: Yup.string().required("Please provide phone number"),
      relationship: Yup.string().required("Please provide relation"),
      address: Yup.string().required("Please provide address physique"),
    }),
    onSubmit: submit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6.5">
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputFieldThin
          label={"First Name"}
          name={"first_name"}
          placeholder={"Enter First Name"}
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
        <InputFieldThin
          className={"w-full xl:w-1/2"}
          label={"Last Name"}
          name={"last_name"}
          type={"text"}
          value={formik.values.last_name}
          placeholder={"Enter Last Name"}
          error={
            formik.touched.last_name && formik.errors.last_name
              ? formik.errors.last_name
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <InputFieldThin
        className={"w-full mb-4.5"}
        label={"Email address"}
        name={"email"}
        type={"text"}
        value={formik.values.email}
        placeholder={"Enter email address"}
        error={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
        <InputFieldThin
          label={"Phone number"}
          name={"phone_number"}
          placeholder={"Enter phone number"}
          type={"text"}
          value={formik.values.phone_number}
          className="w-full xl:w-1/2"
          error={
            formik.touched.phone_number && formik.errors.phone_number
              ? formik.errors.phone_number
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Select
          label={"Relation"}
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
      </div>

      <InputFieldThin
        className={"w-full mb-4.5"}
        label={"Address physique"}
        name={"address"}
        type={"text"}
        value={formik.values.address}
        placeholder={"Enter address physique"}
        error={
          formik.touched.address && formik.errors.address
            ? formik.errors.address
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button
        type={"submit"}
        disabled={isLoading}
        isLoading={isLoading}
        formNoValidate={true}
      >
        Submit Contact
      </Button>
    </form>
  );
};

export default EmergencyContactForm;
