"use client";

import React, { FunctionComponent, useCallback } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { GenericSelectionOption } from "@/types/selection-option";
import Select from "@/components/FormFields/Select";
import Button from "@/components/buttons/Button";
import ContactItemFields from "@/components/FormFields/OpContactForms/ContactItemFields";
import api from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { FormProps } from "@/types/form-props";

const OP_CLIENT_TYPE = [
  "main_provider", // hoofdaanbieder
  "local_authority", // Gemeente
  "particular_party", // particuliere partij
  "healthcare_institution", // Zorginstelling
] as const;

type OpClientType = (typeof OP_CLIENT_TYPE)[number];

type ContactType = { name?: string; email?: string; phone_number?: string };

export type OpOrgContactFormType = {
  types: OpClientType | "";
  name: string;
  address: string;
  postal_code: string;
  place: string;
  land: string;
  contacts: ContactType[];
  KVKnumber: string;
  BTWnumber: string;
  phone_number: string;
  client_number: string;
};

const OpOrgContactFormSchema: Yup.ObjectSchema<OpOrgContactFormType> =
  Yup.object().shape({
    types: Yup.string().oneOf(OP_CLIENT_TYPE).required(),
    name: Yup.string().required("Naam is verplicht"),
    address: Yup.string().required("Adres is verplicht"),
    postal_code: Yup.string().required("Postcode is verplicht"),
    place: Yup.string().required("Plaats is verplicht"),
    land: Yup.string().required("Land is verplicht"),
    contacts: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Naam is verplicht"),
          email: Yup.string()
            .email("Email is niet geldig")
            .required("Email is verplicht"),
          phone_number: Yup.string().required("Telefoonnummer is verplicht"),
        })
      )
      .required("Contacten zijn verplicht"),
    KVKnumber: Yup.string().required("KVK nummer is verplicht"),
    BTWnumber: Yup.string().required("BTW nummer is verplicht"),
    phone_number: Yup.string().required("Telefoonnummer is verplicht"),
    client_number: Yup.string().required("Clientnummer is verplicht"),
  });

const contactInitialValues: ContactType = {
  name: "",
  email: "",
  phone_number: "",
};

const initialValues: OpOrgContactFormType = {
  types: "",
  name: "",
  address: "",
  postal_code: "",
  place: "",
  land: "",
  contacts: [contactInitialValues],
  KVKnumber: "",
  BTWnumber: "",
  phone_number: "",
  client_number: "",
};

const OPTIONS: GenericSelectionOption<string, OpClientType | "">[] = [
  { label: "Selecteer type", value: "" },
  { label: "Hoofdaanbieder", value: "main_provider" },
  { label: "Gemeente", value: "local_authority" },
  { label: "Particuliere partij", value: "particular_party" },
  { label: "Zorginstelling", value: "healthcare_institution" },
];

const OcClientTypeRecord: Record<OpClientType, string> = {
  main_provider: "Hoofdaanbieder",
  local_authority: "Gemeente",
  particular_party: "Particuliere partij",
  healthcare_institution: "Zorginstelling",
};

export type NewContactReqDto = OpOrgContactFormType;
export type ContactResDto = NewContactReqDto & { id: number };

async function createOpOrgContact(values: NewContactReqDto) {
  const response = await api.post<ContactResDto>(
    "client/sender_create/",
    values
  );
  return response.data;
}

const useCreateOpOrgContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOpOrgContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
    },
  });
};

type Props = FormProps<OpOrgContactFormType>;

const OpContactForm: FunctionComponent<Props> = ({ onSuccess }) => {
  const { mutate: createNew, isLoading } = useCreateOpOrgContact();

  const formik = useFormik({
    initialValues,
    validationSchema: OpOrgContactFormSchema,
    onSubmit: (values, formikHelpers) => {
      createNew(values, {
        onSuccess: () => {
          formikHelpers.resetForm();
          onSuccess();
        },
      });
    },
  });

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setValues,
  } = formik;

  const removeItem = useCallback(
    (index: number) => () => {
      setValues((currentValues) => {
        if (currentValues.contacts.length === 1) {
          return {
            ...currentValues,
            contacts: [contactInitialValues],
          };
        } else {
          return {
            ...currentValues,
            contacts: currentValues.contacts.filter((_, i) => i !== index),
          };
        }
      });
    },
    [setValues]
  );

  const addItem = useCallback(() => {
    setValues((current) => ({
      ...current,
      contacts: [...current.contacts, contactInitialValues],
    }));
  }, [setValues]);
  return (
    <FormikProvider value={formik}>
      <form className="p-4" onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-6">Opdrachtgever</h3>
        <Select
          label={"Opdrachtgever type"}
          className={"mb-4"}
          name={"types"}
          options={OPTIONS}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.types && errors.types}
        />
        <InputField
          label={`${OcClientTypeRecord[values.types] ? OcClientTypeRecord[values.types] + " naam" : "Naam"}`}
          className={"mb-4"}
          name={"name"}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Naam"}
          error={touched.name && errors.name}
        />
        <h3 className="text-lg font-semibold mb-6">Contactpersonen</h3>
        {values.contacts.map((_, index) => (
          <ContactItemFields
            order={index}
            key={index}
            onRemove={removeItem(index)}
          />
        ))}
        <Button className={"mb-5 px-6"} onClick={addItem}>
          + Voeg contact toe
        </Button>
        <InputField
          label={"Adres"}
          className={"mb-4"}
          name={"address"}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Adres"}
          error={touched.address && errors.address}
        />
        <h3 className="text-lg font-semibold mb-6">Bedrijfsgegevens</h3>
        <div className="flex flex-col lg:flex-row gap-3">
          <InputField
            label={"Postcode"}
            className={"mb-4"}
            name={"postal_code"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={"Postcode"}
            error={touched.postal_code && errors.postal_code}
          />
          <InputField
            label={"Plaats"}
            className={"mb-4 grow"}
            name={"place"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={"Plaats"}
            error={touched.place && errors.place}
          />
          <InputField
            label={"Land"}
            className={"mb-4"}
            name={"land"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={"Land"}
            error={touched.land && errors.land}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <InputField
            label={"KVK nummer"}
            className={"mb-4"}
            name={"KVKnumber"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={"KVK nummer"}
            error={touched.KVKnumber && errors.KVKnumber}
          />
          <InputField
            label={"BTW nummer"}
            className={"mb-4 grow"}
            name={"BTWnumber"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={"BTW nummer"}
            error={touched.BTWnumber && errors.BTWnumber}
          />
          <InputField
            label={"Telefoonnummer"}
            className={"mb-4"}
            name={"phone_number"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={"Telefoonnummer"}
            error={touched.phone_number && errors.phone_number}
          />
        </div>
        <InputField
          label={"Clientnummer"}
          className={"mb-10"}
          name={"client_number"}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Clientnummer"}
          error={touched.client_number && errors.client_number}
        />

        <Button
          isLoading={isLoading}
          loadingText={"Opdrachtgever wordt opgeslagen..."}
          type={"submit"}
          formNoValidate={true}
        >
          Een nieuwe opdrachtgever toevoegen
        </Button>
      </form>
    </FormikProvider>
  );
};

export default OpContactForm;
