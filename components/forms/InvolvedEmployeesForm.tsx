"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import { useCreateInvolvedEmployee } from "@/utils/involved-employees/createInvolvedEmployee";
import { useEmployees } from "@/utils/involved-employees/getEmployeesData";
import Button from "@/components/buttons/Button";

type PropsType = {
  clientId: number;
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
  const { mutate, isLoading } = useCreateInvolvedEmployee(clientId);
  const submit = useCallback(
    (values: FormTypes) => {
      mutate(values, {
        onSuccess: formik.resetForm,
      });
    },
    [mutate]
  );

  const { data, isLoading: isOptionsLoading } = useEmployees();

  const getEmployeesOptions = () => {
    return data
      ? [
          { label: "Selecteer Medewerker", value: "" },
          ...data.results.map((entry: any) => ({
            label: entry.user_name,
            value: entry.user,
          })),
        ]
      : [];
  };

  const formik = useFormik<FormTypes>({
    initialValues: initialValues,
    validationSchema: Yup.object({
      employee: Yup.string().required("Geef alstublieft een medewerker op"),
      role: Yup.string().required("Geef alstublieft een relatie op"),
      start_date: Yup.string().required("Geef alstublieft een datum op"),
    }),
    onSubmit: submit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6.5">
      <Select
        label={"Medewerker"}
        name={"employee"}
        required={true}
        options={
          isOptionsLoading
            ? [{ label: "Loading ...", value: "" }]
            : getEmployeesOptions()
        }
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
      <InputField
        className={"w-full mb-4.5"}
        label={"Relatie"}
        name={"role"}
        required={true}
        type={"text"}
        value={formik.values.role}
        placeholder={"Voer relatie in"}
        error={
          formik.touched.role && formik.errors.role ? formik.errors.role : null
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <InputField
        label={"Startdatum"}
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
        Medewerker Indienen
      </Button>
    </form>
  );
};

export default InvolvedEmployeesForm;
