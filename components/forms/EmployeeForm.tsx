"use client";

import React, { FunctionComponent, useCallback } from "react";
import Panel from "@/components/Panel";
import { Formik, FormikHelpers } from "formik";
import { EmployeeFormType } from "@/types/employees/employee-form-type";
import InputField from "@/components/FormFields/InputField";
import Button from "@/components/buttons/Button";
import FormikCheckboxItem from "@/components/FormFields/FormikCheckboxItem";
import FormikRadioGroup from "@/components/FormFields/FormikRadioGroup";
import { GENDER_OPTIONS } from "@/consts";
import * as Yup from "yup";
import { useCreateEmployee } from "@/utils/employees/createEmployee";
import { usePatchEmployee } from "@/utils/employees/patchEmployee";
import { useRouter } from "next/navigation";
import { useEmployeeDetails } from "@/utils/employees/getEmployeeDetails";
import FormikLocation from "@/components/FormFields/FormikLocation";

type FormType = EmployeeFormType;

const initialValues: FormType = {
  id: 0,
  employee_number: undefined,
  employment_number: undefined,
  location: "",
  is_subcontractor: false,
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "not_specified",
  email_address: "",
  private_email_address: "",
  authentication_phone_number: "",
  work_phone_number: "",
  private_phone_number: "",
  home_telephone_number: "",
};

const employeeSchema: Yup.ObjectSchema<EmployeeFormType> = Yup.object({
  id: Yup.number(),
  employee_number: Yup.string().required("Medewerkernummer Vereist"),
  employment_number: Yup.string().required("Dienstnummer Vereist"),
  is_subcontractor: Yup.boolean(),
  location: Yup.string(),
  first_name: Yup.string().required("Geef alstublieft de voornaam op"),
  last_name: Yup.string().required("Geef alstublieft de achternaam op"),
  date_of_birth: Yup.string().required("Geef alstublieft de geboortedatum op"),
  gender: Yup.string().required("Geef alstublieft het geslacht op"),
  email_address: Yup.string().required("Geef alstublieft het e-mailadres op"),
  private_email_address: Yup.string(),
  authentication_phone_number: Yup.string(),
  work_phone_number: Yup.string(),
  private_phone_number: Yup.string(),
  home_telephone_number: Yup.string(),
});

type PropsType = {
  employeeId?: number;
  mode: string;
};

const EmployeeForm: FunctionComponent<PropsType> = ({ employeeId, mode }) => {
  const { mutate: create, isLoading: isCreating } = useCreateEmployee();
  const { mutate: update, isLoading: isPatching } = usePatchEmployee();

  const { data, isLoading: isDataLoading } = useEmployeeDetails(employeeId);

  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: employeeId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/employees/${employeeId}`);
            },
          }
        );
      } else if (mode === "new") {
        delete values.id;
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push("/employees");
          },
        });
      }
    },
    [create, update]
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        mode == "edit" ? (data ? data : initialValues) : initialValues
      }
      onSubmit={onSubmit}
      validationSchema={employeeSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-9 sm:grid-cols-2"
        >
          <div className="flex flex-col gap-9">
            <Panel title={"Identificatie"} containerClassName="px-7 py-4">
              <InputField
                className={"w-full mb-4.5"}
                id={"employee_number"}
                required={true}
                label={"Medewerkernummer"}
                maxLength={10}
                type="number"
                placeholder={"Voer medewerkernummer in"}
                value={values.employee_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.employee_number && errors.employee_number}
              />
              <InputField
                className={"w-full mb-4.5"}
                id="employment_number"
                label="Dienstnummer"
                required={true}
                maxLength={12}
                type="number"
                placeholder="Voer dienstnummer in"
                value={values.employment_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.employment_number && errors.employment_number}
              />
              <FormikLocation />
              <FormikCheckboxItem
                label={"Is een onderaannemer"}
                id="is_subcontractor"
                name="is_subcontractor"
                value={values.is_subcontractor}
              />
            </Panel>
            <Panel title={"Naam"} containerClassName="px-7 py-4">
              <InputField
                className={"w-full mb-4.5"}
                id={"first_name"}
                required={true}
                label={"Voornaam"}
                type="string"
                placeholder={"Geef alstublieft een voornaam"}
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.first_name && errors.first_name}
              />
              <InputField
                className={"w-full mb-4.5"}
                id="last_name"
                label="Achternaam"
                required={true}
                type="text"
                placeholder="Geef alstublieft een achternaam"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.last_name && errors.last_name}
              />
            </Panel>
            <Panel title={"Geboortedetails"} containerClassName="px-7 py-4">
              <InputField
                label={"Geboortedatum"}
                required={true}
                id={"date_of_birth"}
                type={"date"}
                className="w-full mb-4.5"
                value={(values.date_of_birth ?? "") + ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.date_of_birth &&
                  errors.date_of_birth &&
                  errors.date_of_birth + ""
                }
              />

              <FormikRadioGroup
                picked={values.gender}
                options={GENDER_OPTIONS}
                id={"gender"}
                label={"Geslacht"}
                name={"gender"}
              />
            </Panel>
            <Button
              type="submit"
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Werknemer bijwerken" : "Medewerker Opslaan"}
            </Button>
          </div>
          <div className="flex flex-col gap-9">
            <Panel title={"Contact"} containerClassName="px-7 py-4">
              <InputField
                label={"E-mailadres"}
                required={true}
                id={"email_address"}
                type={"email"}
                placeholder={"E-mailadres"}
                className="w-full mb-4.5"
                value={values.email_address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email_address && errors.email_address}
              />
              <InputField
                label={"Privé E-mailadres"}
                id={"private_email_address"}
                type={"email"}
                placeholder={"Privé E-mailadres"}
                className="w-full mb-4.5"
                value={values.private_email_address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.private_email_address && errors.private_email_address
                }
              />
              <InputField
                label={"Authenticatie Telefoonnummer"}
                id={"authentication_phone_number"}
                type={"tel"}
                className="w-full mb-4.5"
                value={values.authentication_phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={"Authenticatie Telefoonnummer"}
                error={
                  touched.authentication_phone_number &&
                  errors.authentication_phone_number
                }
              />
              <InputField
                label={"Werk Telefoonnummer"}
                id={"work_phone_number"}
                type={"tel"}
                className="w-full mb-4.5"
                placeholder={"Werk Telefoonnummer"}
                value={values.work_phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.work_phone_number && errors.work_phone_number}
              />
              <InputField
                label={"Privé Telefoonnummer"}
                id={"private_phone_number"}
                type={"tel"}
                className="w-full mb-4.5"
                placeholder={"Privé Telefoonnummer"}
                value={values.private_phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.private_phone_number && errors.private_phone_number
                }
              />
              <InputField
                label={"Huis Telefoonnummer"}
                id={"home_telephone_number"}
                type={"tel"}
                className="w-full mb-4.5"
                placeholder={"Huis Telefoonnummer"}
                value={values.home_telephone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.home_telephone_number && errors.home_telephone_number
                }
              />
            </Panel>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
