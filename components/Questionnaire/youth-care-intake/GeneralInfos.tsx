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
  referrer_organization: "",
  referrer_function: "",
  referrer_phone_number: "",
  referrer_email: "",
  service_choice: "",
  financing_acts: "",
  financing_options: "",
  financing_other: "",
  registration_reason: "",
  current_situation_background: "",
  previous_aid_agencies_involved: false,
  previous_aid_agencies_details: "",
  medical_conditions: false,
  medical_conditions_details: "",
  medication_use: false,
  medication_details: "",
  allergies_or_dietary_needs: false,
  allergies_or_dietary_details: "",
  addictions: false,
  addictions_details: "",
  school_or_daytime_activities: false,
  school_daytime_name: "",
  current_class_level: "",
  school_contact_person: "",
  school_contact_phone: "",
  school_contact_email: "",
  important_people: "",
  external_supervisors_involved: false,
  external_supervisors_details: "",
  special_circumstances: "",
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
  service_choice: Yup.string().required("moet dit veld invullen"),
  financing_acts: Yup.string().optional(),
  financing_options: Yup.string().required("moet dit veld invullen"),
  financing_other: Yup.string().optional(),
  registration_reason: Yup.string().required("moet dit veld invullen"),
  current_situation_background: Yup.string().required("moet dit veld invullen"),
  previous_aid_agencies_involved: Yup.boolean().required("moet dit veld invullen"),
  previous_aid_agencies_details: Yup.string().optional(),
  medical_conditions: Yup.boolean().required("moet dit veld invullen"),
  medical_conditions_details: Yup.string().optional(),
  medication_use: Yup.boolean().required("moet dit veld invullen"),
  medication_details: Yup.string().optional(),
  allergies_or_dietary_needs: Yup.boolean().required("moet dit veld invullen"),
  allergies_or_dietary_details: Yup.string().optional(),
  addictions: Yup.boolean().required("moet dit veld invullen"),
  addictions_details: Yup.string().optional(),
  school_or_daytime_activities: Yup.boolean().required("moet dit veld invullen"),
  school_daytime_name: Yup.string().optional(),
  current_class_level: Yup.string().optional(),
  school_contact_person: Yup.string().optional(),
  school_contact_phone: Yup.string().optional(),
  school_contact_email: Yup.string().optional(),
  important_people: Yup.string().optional(),
  external_supervisors_involved: Yup.boolean().required("moet dit veld invullen"),
  external_supervisors_details: Yup.string().optional(),
  special_circumstances: Yup.string().optional(),
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
  }, [data, values]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* General Information */}
      <Panel title={"1. Algemene Informatie"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
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
            label="Telefoonnummer"
            className={"w-full"}
            id={"phone_number"}
            required={true}
            type={"text"}
            disabled
            value={values.phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone_number && errors.phone_number}
          />
          <InputField
            label="E-mailadres"
            className={"w-full"}
            id={"email"}
            required={true}
            type={"email"}
            disabled
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
        </div>
      </Panel>

      {/* Addresses */}
      <Panel title={"2. Adressen"}>
        {data &&
          data.addresses?.map((address, index) => (
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
                  label={"City"}
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
                  label={"Zip Code"}
                  className={"w-1/3"}
                  id={`addresses[${index}].zip_code`}
                  required={true}
                  type={"text"}
                  disabled
                  value={address.zip_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.addresses?.[index]?.zip_code && errors.addresses?.[index]?.zip_code
                  }
                />
                <InputField
                  label={"Phone Number"}
                  className={"w-1/3"}
                  id={`addresses[${index}].phone_number`}
                  required={true}
                  type={"text"}
                  disabled
                  value={address.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.addresses?.[index]?.phone_number &&
                    errors.addresses?.[index]?.phone_number
                  }
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
            label={"Kies de dienst waarvoor u wilt aanmelden:"}
            id={"service_choice"}
            value={values.service_choice}
            className="w-full"
            required={true}
            options={SERVICE_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Select
            label={"Financieringsvorm:"}
            id={"financing_options"}
            value={values.financing_options}
            className="w-full"
            required={true}
            options={FINANCE_OPTIONS}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputField
            label="Ander Financiering"
            className={"w-full"}
            id={"financing_other"}
            required={false}
            type={"text"}
            value={values.financing_other}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.financing_other && errors.financing_other}
          />
        </div>
      </Panel>

      {/* request for help and background information */}
      <Panel title={"5. Hulpvraag en Achtergrondinformatie"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Reden van aanmelding:"
            className={"w-full"}
            id={"registration_reason"}
            type={"text"}
            value={values.registration_reason}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.registration_reason && errors.registration_reason}
          />
          <InputField
            label="Huidige situatie en achtergrond:"
            className={"w-full"}
            id={"current_situation_background"}
            type={"text"}
            value={values.current_situation_background}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.current_situation_background && errors.current_situation_background}
          />
          <InputField
            label="Eerdere hulpverleningsinstanties betrokken?"
            className={"w-full justify-start items-start flex gap-1"}
            id={"previous_aid_agencies_involved"}
            type={"checkbox"}
            checked={values.previous_aid_agencies_involved}
            onChange={() =>
              setFieldValue(
                "previous_aid_agencies_involved",
                !values.previous_aid_agencies_involved
              )
            }
            onBlur={handleBlur}
            error={touched.previous_aid_agencies_involved && errors.previous_aid_agencies_involved}
          />
          <InputField
            label="Zo ja, welke en met welk resultaat?  "
            className={"w-full"}
            id={"previous_aid_agencies_details"}
            type={"text"}
            value={values.previous_aid_agencies_details}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.previous_aid_agencies_details && errors.previous_aid_agencies_details}
          />
          <InputField
            label="Medische of psychische aandoeningen?"
            className={"w-full justify-start items-start flex gap-1"}
            id={"medical_conditions"}
            type={"checkbox"}
            checked={values.medical_conditions}
            onChange={() => setFieldValue("medical_conditions", !values.medical_conditions)}
            onBlur={handleBlur}
            error={touched.medical_conditions && errors.medical_conditions}
          />
          <InputField
            label="Zo ja, welke? "
            className={"w-full"}
            id={"medical_conditions_details"}
            type={"text"}
            value={values.medical_conditions_details}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.medical_conditions_details && errors.medical_conditions_details}
          />
          <InputField
            label="Medicijngebruik?"
            className={"w-full justify-start items-start flex gap-1"}
            id={"medication_use"}
            type={"checkbox"}
            checked={values.medication_use}
            onChange={() => setFieldValue("medication_use", !values.medication_use)}
            onBlur={handleBlur}
            error={touched.medication_use && errors.medication_use}
          />
          <InputField
            label="Zo ja, welke? "
            className={"w-full"}
            id={"medication_details"}
            type={"text"}
            value={values.medication_details}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.medication_details && errors.medication_details}
          />

          <InputField
            label="Allergieën of dieetwensen?"
            className={"w-full justify-start items-start flex gap-1"}
            id={"allergies_or_dietary_needs"}
            type={"checkbox"}
            checked={values.allergies_or_dietary_needs}
            onChange={() =>
              setFieldValue("allergies_or_dietary_needs", !values.allergies_or_dietary_needs)
            }
            onBlur={handleBlur}
            error={touched.allergies_or_dietary_needs && errors.allergies_or_dietary_needs}
          />
          <InputField
            label="Zo ja, welke? "
            className={"w-full"}
            id={"allergies_or_dietary_details"}
            type={"text"}
            value={values.allergies_or_dietary_details}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.allergies_or_dietary_details && errors.allergies_or_dietary_details}
          />

          <InputField
            label="Verslavingen (bijv. drugs, alcohol)?"
            className={"w-full justify-start items-start flex gap-1"}
            id={"addictions"}
            type={"checkbox"}
            checked={values.addictions}
            onChange={() => setFieldValue("addictions", !values.addictions)}
            onBlur={handleBlur}
            error={touched.addictions && errors.addictions}
          />
          <InputField
            label="Zo ja, welke? "
            className={"w-full"}
            id={"addictions_details"}
            type={"text"}
            value={values.addictions_details}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.addictions_details && errors.addictions_details}
          />
        </div>
      </Panel>

      {/* School and daytime activities */}
      <Panel title={"6. School en Dagbesteding"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Gaat de jongere naar school of heeft de jongere dagbesteding?"
            className={"w-full justify-start items-start flex gap-1"}
            id={"school_or_daytime_activities"}
            type={"checkbox"}
            checked={values.school_or_daytime_activities}
            onChange={() =>
              setFieldValue("school_or_daytime_activities", !values.school_or_daytime_activities)
            }
            onBlur={handleBlur}
            error={touched.school_or_daytime_activities && errors.school_or_daytime_activities}
          />
          <InputField
            label="Naam huidige school/dagbesteding:"
            className={"w-full"}
            id={"school_daytime_name"}
            required={true}
            type={"text"}
            value={values.school_daytime_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.school_daytime_name && errors.school_daytime_name}
          />
          <InputField
            label="Huidige klas/niveau:"
            className={"w-full"}
            id={"current_class_level"}
            required={true}
            type={"text"}
            value={values.current_class_level}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.current_class_level && errors.current_class_level}
          />
          <InputField
            label="Contactpersoon op school/dagbesteding:"
            className={"w-full"}
            id={"school_contact_person"}
            type={"text"}
            value={values.school_contact_person}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.school_contact_person && errors.school_contact_person}
          />
          <InputField
            label="Telefoonnummer:"
            className={"w-full"}
            id={"school_contact_phone"}
            type={"text"}
            value={values.school_contact_phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.school_contact_phone && errors.school_contact_phone}
          />
          <InputField
            label="E-mailadres:"
            className={"w-full"}
            id={"school_contact_email"}
            type={"text"}
            value={values.school_contact_email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.school_contact_email && errors.school_contact_email}
          />
        </div>
      </Panel>

      {/* social network */}
      <Panel title={"7. Sociaal Netwerk"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Belangrijke personen in het leven van de jongere (bijv. vrienden, familie):"
            className={"w-full"}
            id={"important_people"}
            type={"text"}
            value={values.important_people}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.important_people && errors.important_people}
          />
          <InputField
            label="Betrokken eerdere hulpverleningsinstanties"
            className={"w-full justify-start items-start flex gap-1"}
            id={"external_supervisors_involved"}
            type={"checkbox"}
            checked={values.external_supervisors_involved}
            onChange={() =>
              setFieldValue("external_supervisors_involved", !values.external_supervisors_involved)
            }
            onBlur={handleBlur}
            error={touched.external_supervisors_involved && errors.external_supervisors_involved}
          />
          <InputField
            label="Zo ja, wie?"
            className={"w-full"}
            id={"external_supervisors_details"}
            type={"text"}
            value={values.external_supervisors_details}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.external_supervisors_details && errors.external_supervisors_details}
          />
        </div>
      </Panel>

      {/* Attachments */}
      <Panel title={"8. Overige Informatie"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Bijzondere omstandigheden of aanvullende informatie:"
            className={"w-full"}
            id={"special_circumstances"}
            type={"text"}
            value={values.special_circumstances}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.special_circumstances && errors.special_circumstances}
          />
        </div>
      </Panel>
    </>
  );
}
