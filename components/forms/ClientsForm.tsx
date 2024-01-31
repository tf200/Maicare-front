"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Formik } from "formik";
import InputFieldThin from "@/components/FormFields/InputFieldThin";
import { FormikHelpers } from "formik/dist/types";
import Image from "next/image";
import CameraIcon from "@/components/svg/CameraIcon";
import { useCreateClients } from "@/utils/clients/createClients";
import { NewClientsRequest } from "@/types/clients/new-clients-request";
import RadioCustom from "../Checkboxes/RadioCustom";
import Button from "../buttons/Button";

type FormType = NewClientsRequest;

export type ClientsFormType = FormType;

const initialValues: FormType = {
  firt_name: "",
  last_name: "",
  email: "",
  organisation: "",
  location: "",
  departement: "",
  gender: "",
  filenumber: 0,
  phone_number: "",
};
export const clientsSchema: Yup.ObjectSchema<FormType> = Yup.object().shape({
  firt_name: Yup.string().required("Please provide first name"),
  last_name: Yup.string().required("Please provide last Name"),
  email: Yup.string().required("Please provide your email Address"),
  phone_number: Yup.string().required("Please provide phon number"),
  departement: Yup.string(),
  filenumber: Yup.number(),
  location: Yup.string(),
  organsation: Yup.string(),
  organisation: Yup.string(),
  gender: Yup.string(),
});

type PropsType = {};

export const ClientsForm: FunctionComponent<PropsType> = ({}) => {
  const { mutate, isLoading } = useCreateClients();

  const onSubmit = useCallback(
    (values: FormType, { resetForm }: FormikHelpers<FormType>) => {
      mutate(values, {
        onSuccess: resetForm,
      });
    },
    [mutate]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={clientsSchema}
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
            <div className="px-4 mt-[70px] text-center">
              <div className="relative z-30 w-full p-1 mx-auto rounded-full -mt-22 h-30 max-w-30 bg-white/20 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                <div className="relative drop-shadow-2">
                  <Image
                    src={"/images/user/user-06.png"}
                    width={160}
                    height={160}
                    alt="profile"
                  />
                  <label
                    htmlFor="profile"
                    className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                  >
                    <CameraIcon />
                    <input
                      type="file"
                      name="profile"
                      id="profile"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4.5 py-4 flex flex-col gap-6 xl:flex-row">
              <InputFieldThin
                type={"text"}
                label={"First name"}
                id={"firt_name"}
                placeholder={"Enter your first name"}
                className="w-full xl:w-1/2"
                value={values.firt_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firt_name && errors.firt_name}
                required={true}
              />

              <InputFieldThin
                type={"text"}
                label={"Last name"}
                id={"last_name"}
                placeholder={"Enter your last name"}
                className="w-full xl:w-1/2"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.last_name && errors.last_name}
                required={true}
              />
            </div>

            <InputFieldThin
              type={"text"}
              label={"Email"}
              id={"email"}
              placeholder={"Enter your email address"}
              className="w-full mb-4.5"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              required={true}
            />

            <InputFieldThin
              label={"Phone Number"}
              id={"phone_number"}
              placeholder={"Phone Number"}
              type={"text"}
              className="w-full mb-4.5"
              value={values.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone_number && errors.phone_number}
              required={true}
            />

            <InputFieldThin
              label={"Organisation"}
              id={"organisation"}
              placeholder={"Organisation"}
              type={"text"}
              className="w-full mb-4.5"
              value={values.organisation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.organisation && errors.organisation}
            />

            <InputFieldThin
              label={"Location"}
              id={"location"}
              placeholder={"Location"}
              type={"text"}
              className="w-full mb-4.5"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.location && errors.location}
            />

            <InputFieldThin
              label={"Departement"}
              id={"departement"}
              placeholder={"Departement"}
              type={"text"}
              className="w-full mb-4.5"
              value={values.departement}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.departement && errors.departement}
            />

            <div className="mb-4.5 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-6  px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Gender
                </h3>
              </div>
              <div className="flex flex-row gap-5.5 p-6.5">
                <RadioCustom
                  id={1}
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                />
                <RadioCustom
                  id={2}
                  type="radio"
                  label={"Female"}
                  name="gender"
                  value="Female"
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                File Number
              </label>

              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                // label={"filenumber"}
                id={"filenumber"}
                placeholder={"File Number"}
                type={"number"}
                value={values.filenumber}
                onChange={handleChange}
                onBlur={handleBlur}
                // error={touched.filenumber && errors.filenumber}
              />
            </div>

            <Button
              type={"submit"}
              disabled={isLoading}
              isLoading={isLoading}
              formNoValidate={true}
            >
              Submit Clients
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ClientsForm;
