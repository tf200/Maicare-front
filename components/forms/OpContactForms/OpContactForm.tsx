"use client";

import React, { FunctionComponent, useCallback } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import InputField from "@/components/FormFields/InputField";
import { GenericSelectionOption } from "@/types/selection-option";
import Select from "@/components/FormFields/Select";
import Button from "@/components/buttons/Button";
import ContactItemFields from "./ContactItemFields";
import { FormProps } from "@/types/form-props";
import {
  ContactType,
  OP_CLIENT_TYPE,
  OpClientType,
  OpOrgContactFormType,
} from "@/types/op-contact/contact-form-type";
import { useCreateOpOrgContact, useUpdateOpOrgContact } from "@/utils/contacts/createContact";

const OpOrgContactFormSchema: Yup.ObjectSchema<OpOrgContactFormType> = Yup.object().shape({
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
        email: Yup.string().email("Email is niet geldig").required("Email is verplicht"),
        phone_number: Yup.string().required("Telefoonnummer is verplicht"),
      })
    )
    .required("Contacten zijn verplicht"),
  KVKnumber: Yup.string().required("KvK nummer is verplicht"),
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

export const OpClientTypeRecord: Record<OpClientType, string> = {
  main_provider: "Hoofdaanbieder",
  local_authority: "Gemeente",
  particular_party: "Particuliere partij",
  healthcare_institution: "Zorginstelling",
};

type Props = FormProps<OpOrgContactFormType> & {
  id?: number;
};

const OpContactForm: FunctionComponent<Props> = ({ mode = "add", onSuccess, initialData, id }) => {
  const { mutate: createNew, isLoading } = useCreateOpOrgContact();
  const { mutate: updateContact, isLoading: isUpdating } = useUpdateOpOrgContact();

  const formik = useFormik({
    initialValues: initialData || initialValues,
    validationSchema: OpOrgContactFormSchema,
    enableReinitialize: true,
    onSubmit: (values, formikHelpers) => {
      if (mode === "add") {
        createNew(values, {
          onSuccess: () => {
            formikHelpers.resetForm();
            onSuccess();
          },
        });
      } else if (mode === "update") {
        updateContact(
          { id, values },
          {
            onSuccess: () => {
              formikHelpers.resetForm();
              onSuccess();
            },
          }
        );
      }
    },
  });

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, setValues } = formik;

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
          {...formik.getFieldProps("types")}
          error={touched.types && errors.types}
        />
        <InputField
          label={`${OpClientTypeRecord[values.types] ? OpClientTypeRecord[values.types] + " naam" : "Naam"}`}
          className={"mb-4"}
          name={"name"}
          required={true}
          onChange={handleChange}
          onBlur={handleBlur}
          {...formik.getFieldProps("name")}
          placeholder={"Naam"}
          error={touched.name && errors.name}
        />
        <h3 className="text-lg font-semibold mb-6">Contactpersonen</h3>
        {values.contacts.map((_, index) => (
          <ContactItemFields order={index} key={index} onRemove={removeItem(index)} />
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
          {...formik.getFieldProps("address")}
          error={touched.address && errors.address}
        />
        <h3 className="text-lg font-semibold mb-6">Coördinaten</h3>
        <div className="flex flex-col lg:flex-row gap-3">
          <InputField
            label={"Postcode"}
            className={"mb-4"}
            name={"postal_code"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={"Postcode"}
            {...formik.getFieldProps("postal_code")}
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
            {...formik.getFieldProps("place")}
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
            {...formik.getFieldProps("land")}
            error={touched.land && errors.land}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <InputField
            label={"KvK nummer"}
            className={"mb-4"}
            name={"KVKnumber"}
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={"KvK nummer"}
            {...formik.getFieldProps("KVKnumber")}
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
            {...formik.getFieldProps("BTWnumber")}
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
            {...formik.getFieldProps("phone_number")}
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
          {...formik.getFieldProps("client_number")}
          error={touched.client_number && errors.client_number}
        />
        {mode === "add" ? (
          <Button
            isLoading={isLoading}
            loadingText={"Opdrachtgever wordt opgeslagen..."}
            type={"submit"}
            formNoValidate={true}
          >
            Een nieuwe opdrachtgever toevoegen
          </Button>
        ) : (
          <Button
            isLoading={isUpdating}
            loadingText={"Opdrachtgever wordt bijgewerkt..."}
            type={"submit"}
            formNoValidate={true}
          >
            Bijwerken
          </Button>
        )}
      </form>
    </FormikProvider>
  );
};

export default OpContactForm;
