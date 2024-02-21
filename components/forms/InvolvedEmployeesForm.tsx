"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback, useState } from "react";
import { useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import { useCreateInvolvedEmployee } from "@/utils/involved-employees/createInvolvedEmployee";
import { useEmployeesList } from "@/utils/employees/getEmployeesList";
import Button from "@/components/buttons/Button";
import ComboBox from "../ComboBox";

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
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchedKey, setSearchedKey] = useState(null);
  const [errorOptionMessage, setErrorOptionMessage] = useState(null);

  const { mutate, isLoading } = useCreateInvolvedEmployee(clientId);
  const submit = useCallback(
    (values: FormTypes) => {
      mutate(values, {
        onSuccess: formik.resetForm,
      });
    },
    [mutate]
  );

  const { data, isLoading: isSearching } = useEmployeesList({
    search: searchedKey,
    out_of_service: false,
  });

  const formik = useFormik<FormTypes>({
    initialValues: initialValues,
    validationSchema: Yup.object({
      role: Yup.string().required("Geef alstublieft een relatie op"),
      start_date: Yup.string().required("Geef alstublieft een datum op"),
    }),
    onSubmit: (values: FormTypes) => {
      if (!selectedOption) {
        setErrorOptionMessage("Geef alstublieft een medewerker op");
        return;
      } else {
        setErrorOptionMessage("");
        let data = values;
        data.employee = selectedOption?.id;
        submit(values);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6.5">
      <ComboBox
        data={data}
        isLoading={isSearching}
        setSelected={setSelectedOption}
        setSearchedKey={setSearchedKey}
        error={errorOptionMessage}
        setError={setErrorOptionMessage}
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
        onClick={() => {
          if (!selectedOption) {
            setErrorOptionMessage("Geef alstublieft een medewerker op");
          } else {
            setErrorOptionMessage("");
          }
        }}
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
