"use client";

import * as Yup from "yup";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { FormikHelpers } from "formik/dist/types";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { useCreateMeasurement } from "@/utils/measurement/createMeasurement";
import { MeasurmentResDto } from "@/types/measurment/measurment-res-dto";

type FormType = MeasurmentResDto;

export type MeasurementFormType = FormType;

const initialValues: FormType = {
  value: 0,
  measurement_type: "",
};

export const diagnosisSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  id: Yup.number(),
  date: Yup.string(),
  client: Yup.number(),
  value: Yup.number().required("Geef alstublieft een waarde"),
  measurement_type: Yup.string().required("Geef alstublieft een type"),
});

type PropsType = {
  clientId: string;
};

export const MeasurementsForm: FunctionComponent<PropsType> = ({
  clientId,
}) => {
  const { mutate, isLoading } = useCreateMeasurement(parseInt(clientId));
  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          router.push(`/clients/${clientId}/reports-record/measurements`);
        },
      });
    },
    [mutate]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={diagnosisSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <InputField
              className={"w-full mb-4.5"}
              required={true}
              id={"value"}
              label={"Waarde"}
              type={"number"}
              placeholder={"Voer Waarde in"}
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.value && errors.value}
            />

            <InputField
              id={"measurement_type"}
              required={true}
              type={"text"}
              className={"mb-6"}
              label={"Type Meting"}
              placeholder={"Voer Type Meting in"}
              value={values.measurement_type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.measurement_type && errors.measurement_type}
            />

            <Button
              type={"submit"}
              disabled={isLoading}
              isLoading={isLoading}
              formNoValidate={true}
              loadingText={"Meting Wordt Ingediend..."}
            >
              Meting Indienen
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MeasurementsForm;
