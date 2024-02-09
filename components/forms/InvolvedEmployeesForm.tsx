"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { useFormik } from "formik";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Select from "@/components/FormFields/Select";
import { EMERGENCY_RELATION_OPTIONS } from "@/consts";
import { useCreateInvolvedEmployee } from "@/utils/involved-employees/createInvolvedEmployee";
import Button from "@/components/buttons/Button";

type PropsType = {
  clientId: string;
};

type FormTypes = {
  role: string;
  employee: string;
  start_date: string;
};

const initialValues: FormTypes = {
  role: "",
  employee: "",
  start_date: "",
};

export const InvolvedEmployeesForm: FunctionComponent<PropsType> = ({
  clientId,
}) => {
  const { mutate, isLoading } = useCreateInvolvedEmployee(parseInt(clientId));
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
      role: Yup.string().required("Please provide relation"),
      employee: Yup.string().required("Please provide an employee"),
      start_date: Yup.string().required("Please provide a date"),
    }),
    onSubmit: submit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6.5">
      <Select
        label={"Employee"}
        name={"employee"}
        required={true}
        options={EMERGENCY_RELATION_OPTIONS}
        className="w-full mb-4.5"
        value={formik.values.employee}
        error={
          formik.touched.employee && formik.errors.employee
            ? formik.errors.employee
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <InputFieldThin
        className={"w-full mb-4.5"}
        label={"Relation"}
        name={"role"}
        required={true}
        type={"text"}
        value={formik.values.role}
        placeholder={"Enter relation"}
        error={
          formik.touched.role && formik.errors.role
            ? formik.errors.role
            : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <InputFieldThin
        label={"Start Date"}
        required={true}
        name={"start_date"}
        type={"date"}
        className="w-full mb-4.5"
        value={(formik.values.start_date ?? "") + ""}
        error={
          formik.touched.start_date && formik.errors.start_date
            ? formik.errors.start_date
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
        Submit
      </Button>
    </form>
  );
};

export default InvolvedEmployeesForm;
