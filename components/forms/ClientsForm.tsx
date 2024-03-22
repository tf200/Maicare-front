"use client";

import * as Yup from "yup";
import React, { FunctionComponent, useCallback, useMemo } from "react";
import Panel from "@/components/Panel";
import { Formik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { FormikHelpers } from "formik/dist/types";
import { useCreateClients } from "@/utils/clients/createClients";
import { NewClientsRequest } from "@/types/clients/new-clients-request";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import Select from "@/components/FormFields/Select";
import { GENDER_OPTIONS, SOURCE_OPTIONS } from "@/consts";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import FormikRadioGroup from "../FormFields/FormikRadioGroup";
import { usePatchClient } from "@/utils/clients/patchClient";
import { ClientFormType } from "@/types/clients/client-form-type";
import { useLocations } from "@/utils/locations";
import { SelectionOption } from "@/types/selection-option";
import FormikLocation from "@/components/FormFields/FormikLocation";
import { omit } from "@/utils/omit";

const initialValues: ClientFormType = {
  first_name: "",
  last_name: "",
  email: "",
  organisation: "",
  location: "",
  birthplace: "",
  departement: "",
  gender: "",
  filenumber: "",
  date_of_birth: "",
  phone_number: "",
  city: "",
  Zipcode: "",
  infix: "",
  streetname: "",
  street_number: "",
  bsn: "",
  source: "",
};

export const clientsSchema: Yup.ObjectSchema<ClientFormType> =
  Yup.object().shape({
    id: Yup.number(),
    first_name: Yup.string().required("Geef alstublieft een voornaam op"),
    last_name: Yup.string().required("Geef alstublieft een achternaam op"),
    email: Yup.string().required("Geef alstublieft uw e-mailadres op"),
    phone_number: Yup.string().required(
      "Geef alstublieft een telefoonnummer op"
    ),
    departement: Yup.string(),
    filenumber: Yup.string(),
    location: Yup.string(),
    birthplace: Yup.string(),
    date_of_birth: Yup.string().required(
      "Geef alstublieft een geboortedatum op"
    ),
    organisation: Yup.string(),
    gender: Yup.string(),
    city: Yup.string(),
    Zipcode: Yup.string(),
    infix: Yup.string(),
    streetname: Yup.string(),
    street_number: Yup.string(),
    bsn: Yup.string().required("Geef alstublieft een BSN op"),
    source: Yup.string().required("Geef alstublieft een bron op"),
  });

type PropsType = {
  clientId?: number;
  mode: string;
};

export const ClientsForm: FunctionComponent<PropsType> = ({
  clientId,
  mode,
}) => {
  const { mutate: create, isLoading: isCreating } = useCreateClients();
  const { mutate: update, isLoading: isPatching } = usePatchClient(clientId);

  const {
    data,
    isLoading: isDataLoading,
    isError,
  } = useClientDetails(clientId);
  const initialData = useMemo(() => {
    if (data) {
      return omit(data, ["profile_picture", "id"]);
    } else {
      return null;
    }
  }, [data]);

  const router = useRouter();

  const onSubmit = useCallback(
    (values: ClientFormType, { resetForm }: FormikHelpers<ClientFormType>) => {
      if (mode === "edit") {
        update(
          {
            ...values,
            location: parseInt(values.location),
            filenumber: parseInt(values.filenumber),
          },
          {
            onSuccess: () => {
              resetForm();
              router.push(`/clients/${clientId}`);
            },
          }
        );
      } else if (mode === "new") {
        create(
          {
            ...values,
            location: parseInt(values.location),
            filenumber: parseInt(values.filenumber),
          },
          {
            onSuccess: () => {
              resetForm();
              router.push("/clients");
            },
          }
        );
      }
    },
    [create, update]
  );

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={
          mode === "edit" && initialData ? initialData : initialValues
        }
        onSubmit={onSubmit}
        validationSchema={clientsSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          touched,
          handleSubmit,
          errors,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                  <Panel
                    containerClassName="p-6.5 pb-5"
                    title={"Persoonlijke Gegevens"}
                  >
                    <div className="mb-4.5 py-4 flex flex-col gap-6 xl:flex-row">
                      <InputField
                        type={"text"}
                        label={"Voornaam"}
                        id={"first_name"}
                        placeholder={"Voer uw voornaam in"}
                        className="w-full xl:w-1/2"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.first_name && errors.first_name}
                        required={true}
                      />

                      <InputField
                        type={"text"}
                        label={"Achternaam"}
                        id={"last_name"}
                        placeholder={"Voer uw achternaam in"}
                        className="w-full xl:w-1/2"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.last_name && errors.last_name}
                        required={true}
                      />
                    </div>

                    <InputField
                      type={"text"}
                      label={"E-mail"}
                      id={"email"}
                      placeholder={"Voer uw e-mailadres in"}
                      className="w-full mb-4.5"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                      required={true}
                    />

                    <InputField
                      label={"Telefoonnummer"}
                      id={"phone_number"}
                      placeholder={"Voer uw telefoonnummer in"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone_number && errors.phone_number}
                      required={true}
                    />

                    <InputField
                      label={"Tussenvoegsel"}
                      id={"infix"}
                      placeholder={"Voer tussenvoegsel in"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.infix}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.infix && errors.infix}
                    />

                    <div className="mb-4.5 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-6  px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Geslacht
                        </h3>
                      </div>
                      <div className="flex flex-row p-6.5">
                        <FormikRadioGroup
                          picked={values.gender}
                          options={GENDER_OPTIONS}
                          id={"gender"}
                          name={"gender"}
                        />
                      </div>
                    </div>
                    <InputField
                      label={"Geboortedatum"}
                      required={true}
                      id={"date_of_birth"}
                      value={values.date_of_birth}
                      type={"date"}
                      className="w-full mb-4.5"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.date_of_birth &&
                        errors.date_of_birth &&
                        errors.date_of_birth + ""
                      }
                    />
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Dossiernummer
                      </label>

                      <input
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none  transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        id={"filenumber"}
                        placeholder={"Dossiernummer"}
                        type={"number"}
                        value={values.filenumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Panel>

                  <Panel
                    containerClassName="p-6.5 pb-5"
                    title={"Identiteitsgegevens"}
                  >
                    <InputField
                      label={"BSN"}
                      id={"bsn"}
                      placeholder={"Voer BSN in"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.bsn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bsn && errors.bsn}
                      required={true}
                    />
                    <Select
                      label={"Bron"}
                      id={"source"}
                      placeholder={"Voer bron in"}
                      options={SOURCE_OPTIONS}
                      className="w-full mb-4.5"
                      value={values.source}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.source && errors.source}
                      required={true}
                    />
                  </Panel>
                </div>
                <div className="flex flex-col gap-9">
                  <Panel
                    containerClassName="p-6.5 pb-5"
                    title={"Locatiegegevens"}
                  >
                    <FormikLocation />
                    <InputField
                      label={"Geboorteplaats"}
                      id={"birthplace"}
                      placeholder={"Geboorteplaats"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.birthplace}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.birthplace && errors.birthplace}
                    />

                    <InputField
                      label={"Afdeling"}
                      id={"departement"}
                      placeholder={"Afdeling"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.departement}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.departement && errors.departement}
                    />
                    <InputField
                      label={"Organisatie"}
                      id={"organisation"}
                      placeholder={"Organisatie"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.organisation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.organisation && errors.organisation}
                    />
                  </Panel>

                  <Panel
                    containerClassName="p-6.5 pb-5"
                    title={"Adresgegevens"}
                  >
                    <InputField
                      label={"Straatnaam"}
                      id={"streetname"}
                      placeholder={"Straatnaam"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.streetname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.streetname && errors.streetname}
                    />

                    <InputField
                      label={"Huisnummer"}
                      id={"street_number"}
                      placeholder={"Huisnummer"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.street_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.street_number && errors.street_number}
                    />

                    <InputField
                      label={"Stad"}
                      id={"city"}
                      placeholder={"Stad"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.city && errors.city}
                    />

                    <InputField
                      label={"Postcode"}
                      id={"Zipcode"}
                      placeholder={"Postcode"}
                      type={"text"}
                      className="w-full mb-4.5"
                      value={values.Zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.Zipcode && errors.Zipcode}
                    />
                  </Panel>
                </div>
                <Button
                  type={"submit"}
                  disabled={isCreating || isPatching}
                  isLoading={isCreating || isPatching}
                  formNoValidate={true}
                  loadingText={
                    mode === "edit" ? "Bijwerken..." : "Toevoegen..."
                  }
                >
                  {mode === "edit" ? "Klant Bijwerken" : "Cliënten Indienen"}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default ClientsForm;
