"use client";

import React, { FunctionComponent } from "react";
import { Formik } from "formik";
import { useCreateContract } from "@/utils/contracts/createContract";
import { ContractFormType } from "@/types/contracts/contract-form-type";
import * as Yup from "yup";
import { CARE_TYPE_OPTIONS, RATE_TYPE_ARRAY } from "@/consts";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import Select from "@/components/FormFields/Select";
import Button from "@/components/buttons/Button";
import { NewContractReqDto } from "@/types/contracts/new-contract-req.dto";
import { useRouter } from "next/navigation";

const initialValues: ContractFormType = {
  start_date: "",
  end_date: "",
  care_type: "",
  rateType: "",
  rate: "",
};

export const contractSchema: Yup.ObjectSchema<ContractFormType> =
  Yup.object().shape({
    start_date: Yup.string().required("Geef alstublieft de startdatum op"),
    end_date: Yup.string().required("Geef alstublieft de einddatum op"),
    care_type: Yup.string().required("Geef alstublieft het zorgtype op"),
    rateType: Yup.string()
      .oneOf(RATE_TYPE_ARRAY)
      .required("Geef alstublieft het tarieftype op"),
    rate: Yup.string().required("Geef alstublieft het tarief op"),
  });

type PropsType = {
  clientId: number;
};

function mapData(form: ContractFormType, client: number): NewContractReqDto {
  return {
    client: client,
    start_date: form.start_date,
    end_date: form.end_date,
    care_type: form.care_type,
    rate_per_minute: form.rateType === "rate_per_minute" ? form.rate : null,
    rate_per_hour: form.rateType === "rate_per_hour" ? form.rate : null,
    rate_per_day: form.rateType === "rate_per_day" ? form.rate : null,
  };
}

const ContractForm: FunctionComponent<PropsType> = ({ clientId }) => {
  const { mutate, isLoading } = useCreateContract(clientId);
  const router = useRouter();
  const onSubmit = (value: ContractFormType) => {
    mutate(mapData(value, clientId), {
      onSuccess: () => {
        router.back();
      },
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contractSchema}
      onSubmit={onSubmit}
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
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <InputFieldThin
              label={"Startdatum"}
              required={true}
              id={"start_date"}
              type={"date"}
              className="w-full xl:w-1/2"
              value={(values.start_date ?? "") + ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.start_date &&
                errors.start_date &&
                errors.start_date + ""
              }
            />
            <InputFieldThin
              className={"w-full xl:w-1/2"}
              id={"end_date"}
              required={true}
              type={"date"}
              label={"Einddatum"}
              value={(values.end_date ?? "") + ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.end_date && errors.end_date && errors.end_date + ""
              }
            />
          </div>
          <InputFieldThin
            className={"w-full mb-4.5"}
            id={"care_type"}
            required={true}
            type={"text"}
            label={"Zorgtype"}
            placeholder={"Voer Zorgtype in"}
            value={values.care_type}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.care_type && errors.care_type && errors.care_type + ""
            }
          />
          <div className="mb-6 flex flex-col gap-6 xl:flex-row">
            <Select
              label={"Tarieftype"}
              required={true}
              id={"rateType"}
              className="w-full xl:w-1/2"
              value={values.rateType}
              onChange={handleChange}
              onBlur={handleBlur}
              options={CARE_TYPE_OPTIONS}
              error={
                touched.rateType && errors.rateType && errors.rateType + ""
              }
            />
            <InputFieldThin
              className={"w-full xl:w-1/2"}
              id={"rate"}
              required={true}
              type={"number"}
              min={0}
              step="0.01"
              label={"Tarief"}
              isPrice={true}
              placeholder={"Voer Tarief in"}
              value={values.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.rate && errors.rate && errors.rate + ""}
            />
          </div>
          <Button
            type={"submit"}
            disabled={isLoading}
            isLoading={isLoading}
            formNoValidate={true}
            loadingText={"Submitting Contract..."}
          >
            Contract Indienen
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default ContractForm;
