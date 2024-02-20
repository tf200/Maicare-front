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
  value: Yup.number().required("Please provide value"),
  measurement_type: Yup.string().required("Please provide type"),
});

type PropsType = {
  clientId: string;
};

export const MeasurementsForm: FunctionComponent<PropsType> = ({
  clientId,
}) => {
  const { mutate, isLoading } = useCreateMeasurement(parseInt(clientId));
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      mutate(values, {
        onSuccess: () => {
          setIsSuccess(true);
          resetForm();
        },
      });
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push(`/clients/${clientId}/reports-record/measurements`);
      }, 5000);
    }
  }, [isSuccess, router]);

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
              label={"Value"}
              type={"number"}
              placeholder={"Enter Value"}
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
              label={"Measurement Type"}
              placeholder={"Enter Measurement Type"}
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
              loadingText={"Submitting Measurements..."}
            >
              Submit Measurements
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MeasurementsForm;
