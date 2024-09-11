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
  financing_acts: Yup.string().required("moet dit veld invullen"),
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
          <div className="flex gap-4">
            <InputField
              label="Adres"
              className={"w-1/2"}
              id={"address"}
              type={"text"}
              disabled
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && errors.address}
            />
            <InputField
              label="Postcode"
              className={"w-1/2"}
              id={"postcode"}
              type={"text"}
              disabled
              value={values.postcode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postcode && errors.postcode}
            />
          </div>
          <InputField
            label="Woonplaats"
            className={"w-full"}
            id={"residence"}
            type={"text"}
            disabled
            value={values.residence}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.residence && errors.residence}
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
        
      {/* Referrer Information */}
      <Panel title={"2. Verwijzer Informatie"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Naam van de verwijzer"
            className={"w-full"}
            id={"referrer_name"}
            required={true}
            type={"text"}
            value={values.referrer_name}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_name && errors.referrer_name}
          />
          <InputField
            label="Organisatie van de verwijzer"
            className={"w-full"}
            id={"referrer_organization"}
            type={"text"}
            value={values.referrer_organization}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_organization && errors.referrer_organization}
          />
          <InputField
            label="Functie van de verwijzer"
            className={"w-full"}
            id={"referrer_function"}
            type={"text"}
            value={values.referrer_function}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_function && errors.referrer_function}
          />
          <InputField
            label="Telefoonnummer van de verwijzer"
            className={"w-full"}
            id={"referrer_phone_number"}
            type={"text"}
            value={values.referrer_phone_number}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_phone_number && errors.referrer_phone_number}
          />
          <InputField
            label="E-mailadres van de verwijzer"
            className={"w-full"}
            id={"referrer_email"}
            type={"email"}
            value={values.referrer_email}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.referrer_email && errors.referrer_email}
          />
        </div>
      </Panel>

      {/* Service Choice and Financing */}
      <Panel title={"3. Dienstkeuzes en Financiering"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Keuze van dienst"
            className={"w-full"}
            id={"service_choice"}
            required={true}
            type={"text"}
            value={values.service_choice}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.service_choice && errors.service_choice}
          />
          <InputField
            label="Financieringswetten"
            className={"w-full"}
            id={"financing_acts"}
            required={true}
            type={"text"}
            value={values.financing_acts}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.financing_acts && errors.financing_acts}
          />
          <InputField
            label="Financieringsopties"
            className={"w-full"}
            id={"financing_options"}
            required={true}
            type={"text"}
            value={values.financing_options}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.financing_options && errors.financing_options}
          />
          <InputField
            label="Overige financiering"
            className={"w-full"}
            id={"financing_other"}
            type={"text"}
            value={values.financing_other}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.financing_other && errors.financing_other}
          />
        </div>
      </Panel>


      {/* Registration and Background Information */} 
      <Panel title={"4. Registratie en Achtergrondinformatie"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Registratiereden"
            className={"w-full"}
            id={"registration_reason"}
            required={true}
            type={"text"}
            value={values.registration_reason}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.registration_reason && errors.registration_reason}
          />
          <InputField
            label="Achtergrond van de huidige situatie"
            className={"w-full"}
            id={"current_situation_background"}
            required={true}
            type={"text"}
            value={values.current_situation_background}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.current_situation_background && errors.current_situation_background}
          />
          <InputField
            label="Betrokken eerdere hulpverleningsinstanties"
            className={"w-full"}
            id={"previous_aid_agencies_involved"}
            type={"checkbox"}
            checked={values.previous_aid_agencies_involved}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.previous_aid_agencies_involved && errors.previous_aid_agencies_involved}
          />
          <InputField
            label="Details van eerdere hulpverleningsinstanties"
            className={"w-full"}
            id={"previous_aid_agencies_details"}
            type={"text"}
            value={values.previous_aid_agencies_details}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.previous_aid_agencies_details && errors.previous_aid_agencies_details}
          />
        </div>
      </Panel>

      {/* Medical and Medication Information */}  
      <Panel title={"5. Medische en Medicatie-informatie"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Medische aandoeningen"
            className={"w-full"}
            id={"medical_conditions"}
            type={"checkbox"}
            checked={values.medical_conditions}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.medical_conditions && errors.medical_conditions}
          />
          <InputField
            label="Details van medische aandoeningen"
            className={"w-full"}
            id={"medical_conditions_details"}
            type={"text"}
            value={values.medical_conditions_details}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.medical_conditions_details && errors.medical_conditions_details}
          />
          <InputField
            label="Gebruik van medicatie"
            className={"w-full"}
            id={"medication_use"}
            type={"checkbox"}
            checked={values.medication_use}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.medication_use && errors.medication_use}
          />
          <InputField
            label="Details van medicatie"
            className={"w-full"}
            id={"medication_details"}
            type={"text"}
            value={values.medication_details}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.medication_details && errors.medication_details}
          />
          <InputField
            label="Allergieën of dieetbehoeften"
            className={"w-full"}
            id={"allergies_or_dietary_needs"}
            type={"checkbox"}
            checked={values.allergies_or_dietary_needs}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.allergies_or_dietary_needs && errors.allergies_or_dietary_needs}
          />
          <InputField
            label="Details van allergieën of dieetbehoeften"
            className={"w-full"}
            id={"allergies_or_dietary_details"}
            type={"text"}
            value={values.allergies_or_dietary_details}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.allergies_or_dietary_details && errors.allergies_or_dietary_details}
          />
          <InputField
            label="Verslavingen"
            className={"w-full"}
            id={"addictions"}
            type={"checkbox"}
            checked={values.addictions}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.addictions && errors.addictions}
          />
          <InputField
            label="Details van verslavingen"
            className={"w-full"}
            id={"addictions_details"}
            type={"text"}
            value={values.addictions_details}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.addictions_details && errors.addictions_details}
          />
        </div>
      </Panel>


      {/* School and Daily Activities */}
      <Panel title={"6. School en Dagelijkse Activiteiten"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Huidige school"
            className={"w-full"}
            id={"current_school"}
            type={"text"}
            value={values.current_school}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.current_school && errors.current_school}
          />
          <InputField
            label="Huidige opleiding"
            className={"w-full"}
            id={"current_education"}
            type={"text"}
            value={values.current_education}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.current_education && errors.current_education}
          />
          <InputField
            label="Deelnemer aan buitenschoolse activiteiten"
            className={"w-full"}
            id={"extracurricular_activities"}
            type={"checkbox"}
            checked={values.extracurricular_activities}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.extracurricular_activities && errors.extracurricular_activities}
          />
          <InputField
            label="Details van buitenschoolse activiteiten"
            className={"w-full"}
            id={"extracurricular_activities_details"}
            type={"text"}
            value={values.extracurricular_activities_details}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.extracurricular_activities_details && errors.extracurricular_activities_details}
          />
        </div>
      </Panel>


      {/* Family Information */}
      <Panel title={"7. Gezin Informatie"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Naam van de ouder(s)/voogd(en)"
            className={"w-full"}
            id={"parent_guardian_name"}
            required={true}
            type={"text"}
            value={values.parent_guardian_name}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.parent_guardian_name && errors.parent_guardian_name}
          />
          <InputField
            label="Relatie tot de deelnemer"
            className={"w-full"}
            id={"relation_to_participant"}
            required={true}
            type={"text"}
            value={values.relation_to_participant}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.relation_to_participant && errors.relation_to_participant}
          />
          <InputField
            label="Contactgegevens van ouder(s)/voogd(en)"
            className={"w-full"}
            id={"parent_guardian_contact_details"}
            required={true}
            type={"text"}
            value={values.parent_guardian_contact_details}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.parent_guardian_contact_details && errors.parent_guardian_contact_details}
          />
          <InputField
            label="Leefomstandigheden en gezinssamenstelling"
            className={"w-full"}
            id={"living_conditions_family_composition"}
            type={"text"}
            value={values.living_conditions_family_composition}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.living_conditions_family_composition && errors.living_conditions_family_composition}
          />
        </div>
      </Panel>


      {/* Legal Information */}
      <Panel title={"8. Juridische Zaken"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Juridische status"
            className={"w-full"}
            id={"legal_status"}
            type={"text"}
            value={values.legal_status}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.legal_status && errors.legal_status}
          />
          <InputField
            label="Details van juridische zaken"
            className={"w-full"}
            id={"legal_matters_details"}
            type={"text"}
            value={values.legal_matters_details}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.legal_matters_details && errors.legal_matters_details}
          />
        </div>
      </Panel>


      {/* Attachments */}
      <Panel title={"9. Bijlagen"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <InputField
            label="Bijlagen"
            className={"w-full"}
            id={"attachments"}
            type={"text"}
            value={values.attachments}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.attachments && errors.attachments}
          />
        </div>
      </Panel>
    </>
  );
}

