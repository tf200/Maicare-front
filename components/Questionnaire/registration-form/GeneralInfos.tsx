import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import Panel from "@/components/Panel";
import { CONSENT_DECLARATION_CONTENT, FINANCE_OPTIONS, SERVICE_OPTIONS } from "@/consts";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import React, { useEffect } from "react";
import * as Yup from "yup";

export const GeneralInfosInitialValue = {
  name: "",
  date_of_birth: "",
  gender: "",
  nationality: "",
  bsn: "",
  address: "",
  postcode: "",
  residence: "",
  phone_number: "",
  email: "",
  referrer_name: "",
  referrer_organization: null,
  referrer_function: null,
  referrer_phone_number: null,
  referrer_email: null,
  service: "",
  financing: "",
  other_financing: null,
  reason_for_registration: "",
  current_situation: "",
  previous_aid_agencies_involved: false,
  previous_aid_details: null,
  other_details: null,
  how_did_you_find_us: null,
};



export const GeneralInfosShema = {
  name: Yup.string().required("moet dit veld invullen"),
  date_of_birth: Yup.string().required("moet dit veld invullen"),
  gender: Yup.string().required("moet dit veld invullen"),
  nationality: Yup.string().required("moet dit veld invullen"),
  bsn: Yup.string().required("moet dit veld invullen"),
  address: Yup.string().optional(),
  postcode: Yup.string().optional(),
  residence: Yup.string().optional(),
  phone_number: Yup.string().required("moet dit veld invullen"),
  email: Yup.string().required("moet dit veld invullen"),
  referrer_name: Yup.string().required("moet dit veld invullen"),
  referrer_organization: Yup.string().optional(),
  referrer_function: Yup.string().optional(),
  referrer_phone_number: Yup.string().optional(),
  referrer_email: Yup.string().optional(),
  service: Yup.string().required("moet dit veld invullen"),
  financing: Yup.string().required("moet dit veld invullen"),
  other_financing: Yup.string().optional(),
  reason_for_registration: Yup.string().required("moet dit veld invullen"),
  current_situation: Yup.string().required("moet dit veld invullen"),
  previous_aid_agencies_involved: Yup.boolean().required("moet dit veld invullen"),
  previous_aid_details: Yup.string().optional(),
  other_details: Yup.string().optional(),
  how_did_you_find_us: Yup.string().optional(),
};

export default function GeneralInfos({
  handleChange,
  values,
  handleBlur,
  touched,
  errors,
  client_id,
  setFieldValue,
}) {
  const { data, isLoading } = useClientDetails(client_id);
  useEffect(() => {
    if (data) {
      setFieldValue("name", `${data.first_name} ${data.last_name}`);
      setFieldValue("date_of_birth", data.date_of_birth);
      setFieldValue("gender", data.gender);
      setFieldValue("bsn", data.bsn);
      setFieldValue("address", `${data.streetname} ${data.street_number}`);
      setFieldValue("postcode", data.Zipcode);
      setFieldValue("residence", data.city);
      setFieldValue("nationality", data.birthplace);
      setFieldValue("phone_number", data.phone_number);
      setFieldValue("email", data.email);
    }
    if (!values.statement_by_representative) {
      setFieldValue(
        "statement_by_representative",
        `${CONSENT_DECLARATION_CONTENT.legal_representative}`
      );
    }
  }, [data, values]);
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* Client information */}
      <Panel title={"1. Algemene Informatie van de Klant"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          {/* General Information */}
          <div className="flex flex-col gap-4">
            <InputField
              label="Naam"
              className={"w-full"}
              id={"name"}
              required={true}
              type={"text"}
              value={values.name}
              disabled
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
            />
            <div className="flex gap-4">
              <InputField
                label="Geslacht"
                className={"w-1/2"}
                id={"gender"}
                required={true}
                disabled
                type={"text"}
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.gender && errors.gender}
              />
              <InputField
                label="Geboortedatum"
                className={"w-1/2"}
                id={"date_of_birth"}
                required={true}
                type={"date"}
                value={values.date_of_birth}
                disabled
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.date_of_birth && errors.date_of_birth}
              />
            </div>
            <InputField
              label="Nationaliteit"
              className={"w-full"}
              id={"nationality"}
              required={true}
              disabled  
              type={"text"}
              value={values.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.nationality && errors.nationality}
            />
            <InputField
              label="BSN"
              className={"w-full"}
              id={"bsn"}
              required={true}
              disabled
              type={"text"}
              value={values.bsn}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.bsn && errors.bsn}
            />
            <InputField
              label="Email"
              className={"w-full"}
              id={"email"}
              required={true}
              type={"email"}
              value={values.email}
              disabled
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
          </div>
        </div>
      </Panel>

      {/* Addresses */}
      <Panel title={"2. Adressen"}>
        {data && data.addresses?.map((address, index) => (
          <div key={index} className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
            <div className="flex gap-1">
              <InputField
                label={`Adres van ${address.belongs_to}`}
                className={"w-full"}
                id={`addresses[${index}].address`}
                required={true}
                disabled
                type={"text"}
                value={address.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.address && errors.addresses?.[index]?.address}
              />
            </div>
            <div className="flex gap-1">
              <InputField
                label={`City`}
                className={"w-1/3"}
                id={`addresses[${index}].city`}
                required={true}
                type={"text"}
                disabled
                value={address.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.city && errors.addresses?.[index]?.city}
              />
              <InputField
                label={`Zip Code`}
                className={"w-1/3"}
                id={`addresses[${index}].zip_code`}
                required={true}
                type={"text"}
                disabled
                value={address.zip_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.zip_code && errors.addresses?.[index]?.zip_code}
              />
              <InputField
                label={`Phone Number`}
                className={"w-1/3"}
                id={`addresses[${index}].phone_number`}
                required={true}
                type={"text"}
                disabled
                value={address.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.addresses?.[index]?.phone_number && errors.addresses?.[index]?.phone_number}
              />
            </div>
          </div>
        ))}
      </Panel>

      {/* Referrer Information */}
      <Panel title={"3. Informatie van Verwijzer"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Naam Verwijzer"
            className={"w-full"}
            id={"referrer_name"}
            required={true}
            type={"text"}
            value={values.referrer_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_name && errors.referrer_name}
          />
          <InputField
            label="Organisatie Verwijzer"
            className={"w-full"}
            id={"referrer_organization"}
            required={false}
            type={"text"}
            value={values.referrer_organization}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_organization && errors.referrer_organization}
          />
          <InputField
            label="Functie Verwijzer"
            className={"w-full"}
            id={"referrer_function"}
            required={false}
            type={"text"}
            value={values.referrer_function}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_function && errors.referrer_function}
          />
          <InputField
            label="Telefoonnummer Verwijzer"
            className={"w-full"}
            id={"referrer_phone_number"}
            required={false}
            type={"text"}
            value={values.referrer_phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_phone_number && errors.referrer_phone_number}
          />
          <InputField
            label="Email Verwijzer"
            className={"w-full"}
            id={"referrer_email"}
            required={false}
            type={"email"}
            value={values.referrer_email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_email && errors.referrer_email}
          />
        </div>
      </Panel>

      {/* Registration Details */}
      <Panel title={"4. Registratie Gegevens"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <Select
            label={"Dienst"}
            id={"service"}
            value={values.service}
            className="w-full"
            required={true}
            options={SERVICE_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Select
            label={"Financiering"}
            id={"financing"}
            value={values.financing}
            className="w-full"
            required={true}
            options={FINANCE_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputField
            label="Ander Financiering"
            className={"w-full"}
            id={"other_financing"}
            required={false}
            type={"text"}
            value={values.other_financing}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.other_financing && errors.other_financing}
          />
          <InputField
            label="Reden voor Registratie"
            className={"w-full"}
            id={"reason_for_registration"}
            required={true}
            type={"text"}
            value={values.reason_for_registration}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.reason_for_registration && errors.reason_for_registration}
          />
          <InputField
            label="Huidige Situatie"
            className={"w-full"}
            id={"current_situation"}
            required={true}
            type={"text"}
            value={values.current_situation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.current_situation && errors.current_situation}
          />
          <InputField
            label="Eerdere Hulporganisaties Betrokken"
            className={"w-full justify-start items-start flex gap-1"}
            id={"previous_aid_agencies_involved"}
            required={true}
            type={"checkbox"}
            checked={values.previous_aid_agencies_involved}
            onChange={() => setFieldValue("previous_aid_agencies_involved", !values.previous_aid_agencies_involved)}
            onBlur={handleBlur}
            error={touched.previous_aid_agencies_involved && errors.previous_aid_agencies_involved}
          />
          <InputField
            label="Details Eerdere Hulp"
            className={"w-full"}
            id={"previous_aid_details"}
            required={false}
            type={"text"}
            value={values.previous_aid_details}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.previous_aid_details && errors.previous_aid_details}
          />
          <InputField
            label="Overige Details"
            className={"w-full"}
            id={"other_details"}
            required={false}
            type={"text"}
            value={values.other_details}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.other_details && errors.other_details}
          />
          <InputField
            label="Hoe Heeft U Ons Gevonden"
            className={"w-full"}
            id={"how_did_you_find_us"}
            required={false}
            type={"text"}
            value={values.how_did_you_find_us}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.how_did_you_find_us && errors.how_did_you_find_us}
          />
        </div>
      </Panel>
    </>
  );
}
