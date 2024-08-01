"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { useCreateInvolvedEmployee } from "@/utils/involved-employees/createInvolvedEmployee";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { useGetInvolved } from "@/utils/involved-employees/getInvolved";
import { usePatchInvolvedEmployee } from "@/utils/involved-employees/patchInvolvedEmployees";
import EmployeeSelector from "@/components/FormFields/comboboxes/EmployeeSelector";
import { EmployeeAssignmentType } from "@/types/employee-asgnmnt-type";
import Select from "@/components/FormFields/Select";
import { EMPLOYEE_ASSIGNMENT_OPTIONS } from "@/consts";

type PropsType = {
  clientId: number;
  involvedId?: number;
  mode: string;
};

type FormTypes = {
  role: EmployeeAssignmentType | "";
  employee: number | null;
  start_date: string;
};

const initialValues: FormTypes = {
  role: "",
  employee: null,
  start_date: "",
};

export const InvolvedEmployeesForm: FunctionComponent<PropsType> = ({
  clientId,
  involvedId,
  mode,
}) => {
  const router = useRouter();

  const {
    data: involvedData,
    isLoading: isDataLoading,
    isError,
  } = useGetInvolved(involvedId, clientId);

  const { mutate: create, isLoading: isCreating } = useCreateInvolvedEmployee(clientId);
  const { mutate: update, isLoading: isPatching } = usePatchInvolvedEmployee(clientId);

  const onSubmit = useCallback(
    (values, { resetForm }) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: involvedId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/client-network/involved-employees`);
            },
          }
        );
      } else if (mode === "new") {
        create(
          {
            ...values,
            client: clientId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/client-network/involved-employees`);
            },
          }
        );
      }
    },
    [create, update]
  );

  const formik = useFormik<FormTypes>({
    enableReinitialize: true,
    initialValues: mode == "edit" ? (involvedData ? involvedData : initialValues) : initialValues,
    validationSchema: Yup.object({
      role: Yup.string().required("Geef alstublieft een relatie op"),
      start_date: Yup.string().required("Geef alstublieft een datum op"),
      employee: Yup.number().required("Geef alstublieft een medewerker op").nullable(),
    }),
    onSubmit: onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="p-6.5">
        <EmployeeSelector className="mb-6" name={"employee"} required={true} />
        <Select
          className={"w-full mb-4.5"}
          label={"Relatie"}
          name={"role"}
          required={true}
          options={EMPLOYEE_ASSIGNMENT_OPTIONS}
          value={formik.values.role}
          placeholder={"Voer relatie in"}
          error={formik.touched.role && formik.errors.role ? formik.errors.role : null}
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
            formik.touched.start_date && formik.errors.start_date ? formik.errors.start_date : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Button
          type={"submit"}
          disabled={isCreating || isPatching}
          isLoading={isCreating || isPatching}
          formNoValidate={true}
          loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
        >
          {mode === "edit" ? "Medewerker bijwerken" : "Medewerker indienen"}
        </Button>
      </form>
    </FormikProvider>
  );
};

export default InvolvedEmployeesForm;
