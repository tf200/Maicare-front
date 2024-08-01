"use client";

import { NewDiagnosisReqDto } from "@/types/diagnosis/new-diagnosis-req-dto";
import * as Yup from "yup";
import React, { FunctionComponent, useCallback } from "react";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import { DIAGNOSIS_SEVERITY_ARRAY, DIAGNOSIS_SEVERITY_OPTIONS } from "@/consts";
import Textarea from "@/components/FormFields/Textarea";
import { DiagnosisSeverity } from "@/types/dagnosis-servity";
import { useCreateDiagnosis } from "@/utils/diagnosis/createDiagnosis";
import { usePatchDiagnosis } from "@/utils/diagnosis/patchDiagnosis";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { useGetDiagnosis } from "@/utils/diagnosis/getDiagnosis";

type FormType = Omit<
  NewDiagnosisReqDto,
  "client" | "severity" | "date_of_diagnosis" | "diagnosing_clinician"
> & {
  severity: DiagnosisSeverity | "";
};

export type DiagnosisFormType = FormType;

const initialValues: FormType = {
  id: 0,
  title: "",
  description: "",
  diagnosis_code: "",
  severity: "",
  status: "",
  notes: "",
};

export const diagnosisSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  id: Yup.number(),
  title: Yup.string().required("Geef alstublieft een samenvatting van de diagnose"),
  description: Yup.string().required("Geef alstublieft de conditie van de patiënt"),
  diagnosis_code: Yup.string()
    .max(10, "Diagnosecode mag niet langer zijn dan 10 tekens")
    .required("Geef alstublieft de diagnosecode"),
  severity: Yup.string()
    .oneOf(DIAGNOSIS_SEVERITY_ARRAY, "Selecteer een geldige ernst")
    .required("Geef alstublieft de ernst van de diagnose"),
  status: Yup.string().required("Geef alstublieft de status van de diagnose"),
  notes: Yup.string().required("Geef alstublieft opmerkingen voor de diagnose"),
});

type PropsType = {
  clientId: number;
  diagnosisId?: number;
  mode: string;
};

export const DiagnosisForm: FunctionComponent<PropsType> = ({ clientId, mode, diagnosisId }) => {
  const router = useRouter();

  const { data, isLoading: isDataLoading, isError } = useGetDiagnosis(diagnosisId, clientId);

  const { mutate: create, isLoading: isCreating } = useCreateDiagnosis(clientId, "mock-clinician");

  const { mutate: update, isLoading: isPatching } = usePatchDiagnosis(clientId);

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            id: diagnosisId,
          },
          {
            onSuccess: () => {
              resetForm;
              router.push(`/clients/${clientId}/medical-record/diagnosis`);
            },
          }
        );
      } else if (mode === "new") {
        create(values, {
          onSuccess: () => {
            resetForm;
            router.push(`/clients/${clientId}/medical-record/diagnosis`);
          },
        });
      }
    },
    [create, update]
  );

  return (
    <Formik
      enableReinitialize={true}
      initialValues={mode == "edit" ? (data ? data : initialValues) : initialValues}
      onSubmit={onSubmit}
      validationSchema={diagnosisSchema}
    >
      {({ values, handleChange, handleBlur, touched, handleSubmit, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"title"}
              label={"Samenvatting diagnose"}
              type={"text"}
              placeholder={"Voer samenvatting van de diagnose in"}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.title && errors.title}
            />
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <InputField
                label={"Aandoening"}
                required={true}
                id={"description"}
                placeholder={"Voer conditie van de patiënt in"}
                type={"text"}
                className="w-full xl:w-1/2"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
              />
              <InputField
                className={"w-full xl:w-1/2"}
                id={"diagnosis_code"}
                required={true}
                maxLength={10}
                label={"ICD Code"}
                type={"text"}
                placeholder={"Voer ICD-code van de diagnose in"}
                value={values.diagnosis_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.diagnosis_code && errors.diagnosis_code}
              />
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <Select
                label={"Ernst"}
                id={"severity"}
                required={true}
                options={DIAGNOSIS_SEVERITY_OPTIONS}
                className="w-full xl:w-1/2"
                value={values.severity}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.severity && errors.severity}
              />
              <InputField
                className={"w-full xl:w-1/2"}
                id={"status"}
                required={true}
                label={"Status"}
                type={"text"}
                placeholder={"Voer huidige status van de patiënt in"}
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.status && errors.status}
              />
            </div>

            <Textarea
              rows={6}
              id={"notes"}
              required={true}
              className={"mb-6"}
              label={"Diagnose notities"}
              placeholder={"Geef notities voor de diagnose"}
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.notes && errors.notes}
            />

            <Button
              type={"submit"}
              disabled={isCreating || isPatching}
              isLoading={isCreating || isPatching}
              formNoValidate={true}
              loadingText={mode === "edit" ? "Bijwerken..." : "Toevoegen..."}
            >
              {mode === "edit" ? "Diagnose bijwerken" : "Diagnose indienen"}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default DiagnosisForm;
