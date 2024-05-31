import InputField from "@/components/FormFields/InputField";
import Textarea from "@/components/FormFields/Textarea";
import Panel from "@/components/Panel";
import { CONSENT_DECLARATION_CONTENT } from "@/consts";
import { useClientDetails } from "@/utils/clients/getClientDetails";
import React, { useEffect } from "react";
import * as Yup from "yup";

export const GeneralInfosInitialValue = {
  youth_name: "",
  date_of_birth: "",
  parent_guardian_name: "",
  address: "",
  youth_care_institution: "",
  proposed_assistance_description: "",
  statement_by_representative: "",
  parent_guardian_signature_date: "",
  juvenile_name: "",
  juvenile_signature_date: "",
  representative_name: "",
  representative_signature_date: "",
  contact_person_name: "",
  contact_phone_number: "",
  contact_email: "",
};

export const GeneralInfosShema = {
  youth_name: Yup.string().required("moet dit veld invullen"),
  date_of_birth: Yup.string().required("moet dit veld invullen"),
  parent_guardian_name: Yup.string().required("moet dit veld invullen"),
  address: Yup.string().required("moet dit veld invullen"),
  youth_care_institution: Yup.string().required("moet dit veld invullen"),
  proposed_assistance_description: Yup.string().required("moet dit veld invullen"),
  statement_by_representative: Yup.string().required("moet dit veld invullen"),
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
      setFieldValue("youth_name", `${data.first_name} ${data.last_name}`);
      setFieldValue("date_of_birth", `${data.date_of_birth}`);
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
    <Panel title={"1. Instemmingsverklaring"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <div className="flex flex-col gap-4">
          <InputField
            label="Naam jeugdige"
            className={"w-full"}
            id={"youth_name"}
            required={true}
            type={"text"}
            value={values.youth_name}
            disabled
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.youth_name && errors.youth_name}
          />
          <div className="flex  gap-4">
            <InputField
              label="Geboortedatum"
              className={"w-1/2"}
              id={"date_of_birth"}
              disabled
              required={true}
              type={"date"}
              value={values.date_of_birth}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date_of_birth && errors.date_of_birth}
            />
            <InputField
              label="Naam ouder/voogd"
              className={"w-1/2"}
              id={"parent_guardian_name"}
              required={true}
              type={"text"}
              value={values.parent_guardian_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.parent_guardian_name && errors.parent_guardian_name}
            />
          </div>
          <InputField
            label="Adres"
            className={"w-full"}
            id={"address"}
            required={true}
            type={"text"}
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && errors.address}
          />
          <InputField
            label="Jeugdzorginstelling"
            className={"w-full"}
            id={"youth_care_institution"}
            required={true}
            type={"text"}
            value={values.youth_care_institution}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.youth_care_institution && errors.youth_care_institution}
          />
          <Textarea
            label="Omschrijving van de voorgestelde hulpverlening of behandeling"
            className={"w-full"}
            id={"proposed_assistance_description"}
            required={true}
            placeholder={CONSENT_DECLARATION_CONTENT.description_of_proposed_assistence}
            value={values.proposed_assistance_description}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            error={
              touched.proposed_assistance_description && errors.proposed_assistance_description
            }
          />
          <Textarea
            label="Verklaring van de jeugdige en/of wettelijk vertegenwoordiger"
            className={"w-full"}
            id={"statement_by_representative"}
            required={true}
            value={values.statement_by_representative}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.statement_by_representative && errors.statement_by_representative}
            rows={8}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Datum handtekening oudervoogd"
              id={"parent_guardian_signature_date"}
              required={true}
              type={"date"}
              value={values.parent_guardian_signature_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.parent_guardian_signature_date && errors.parent_guardian_signature_date
              }
            />

            <InputField
              label="Jeugdige naam"
              id={"juvenile_name"}
              required={true}
              type={"text"}
              value={values.juvenile_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.juvenile_name && errors.juvenile_name}
            />
            <InputField
              label="Datum handtekening jeugd"
              id={"juvenile_signature_date"}
              required={true}
              type={"date"}
              value={values.juvenile_signature_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.juvenile_signature_date && errors.juvenile_signature_date}
            />

            <InputField
              label="Representatieve naam"
              id={"representative_name"}
              required={true}
              type={"text"}
              value={values.representative_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.representative_name && errors.representative_name}
            />
            <InputField
              label="Representatieve handtekeningdatum"
              id={"representative_signature_date"}
              required={true}
              type={"date"}
              value={values.representative_signature_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.representative_signature_date && errors.representative_signature_date}
            />
            <InputField
              label="Naam contactpersoon"
              id={"contact_person_name"}
              required={true}
              type={"text"}
              value={values.contact_person_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.contact_person_name && errors.contact_person_name}
            />
            <InputField
              label="Contact telefoonnummer"
              id={"contact_phone_number"}
              required={true}
              type={"text"}
              value={values.contact_phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.contact_phone_number && errors.contact_phone_number}
            />
            <InputField
              label="Contact email"
              id={"contact_email"}
              required={true}
              type={"text"}
              value={values.contact_email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.contact_email && errors.contact_email}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
