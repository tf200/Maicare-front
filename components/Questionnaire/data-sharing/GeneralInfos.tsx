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
  data_description: "",
  data_purpose: "",
  third_party_names: "",
  statement: "",
  parent_guardian_signature_name: "",
  parent_guardian_signature: "",
  parent_guardian_signature_date: "",
  juvenile_name: "",
  juvenile_signature_date: "",
  institution_representative_name: "",
  institution_representative_signature: "",
  institution_representative_signature_date: "",
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
  data_description: Yup.string().required("moet dit veld invullen"),
  data_purpose: Yup.string().required("moet dit veld invullen"),
  third_party_names: Yup.string().required("moet dit veld invullen"),
  statement: Yup.string().required("moet dit veld invullen"),
  parent_guardian_signature_name: Yup.string().required("moet dit veld invullen"),
  parent_guardian_signature: Yup.string().required("moet dit veld invullen"),
  parent_guardian_signature_date: Yup.string().required("moet dit veld invullen"),
  juvenile_name: Yup.string().required("moet dit veld invullen"),
  juvenile_signature_date: Yup.string().required("moet dit veld invullen"),
  institution_representative_name: Yup.string().required("moet dit veld invullen"),
  institution_representative_signature: Yup.string().required("moet dit veld invullen"),
  institution_representative_signature_date: Yup.string().required("moet dit veld invullen"),
  contact_person_name: Yup.string().required("moet dit veld invullen"),
  contact_phone_number: Yup.string().required("moet dit veld invullen"),
  contact_email: Yup.string().required("moet dit veld invullen"),
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
    if (!values.data_purpose) {
      setFieldValue("data_purpose", `${CONSENT_DECLARATION_CONTENT.legal_representative}`);
    }
  }, [data, values, setFieldValue]);

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
          <div className="flex gap-4">
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
            id={"data_description"}
            required={true}
            placeholder={CONSENT_DECLARATION_CONTENT.description_of_proposed_assistence}
            value={values.data_description}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            error={touched.data_description && errors.data_description}
          />
          <Textarea
            label="Verklaring van de jeugdige en/of wettelijk vertegenwoordiger"
            className={"w-full"}
            id={"data_purpose"}
            required={true}
            value={values.data_purpose}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.data_purpose && errors.data_purpose}
            rows={8}
          />
          <InputField
            label="Namen van derde partijen"
            className={"w-full"}
            id={"third_party_names"}
            required={true}
            type={"text"}
            value={values.third_party_names}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.third_party_names && errors.third_party_names}
          />
          <Textarea
            label="Verklaring"
            className={"w-full"}
            id={"statement"}
            required={true}
            value={values.statement}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.statement && errors.statement}
            rows={4}
          />
          <InputField
            label="Naam ouder/voogd voor handtekening"
            id={"parent_guardian_signature_name"}
            required={true}
            type={"text"}
            value={values.parent_guardian_signature_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.parent_guardian_signature_name && errors.parent_guardian_signature_name}
          />
          <InputField
            label="Handtekening ouder/voogd"
            id={"parent_guardian_signature"}
            required={true}
            type={"text"}
            value={values.parent_guardian_signature}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.parent_guardian_signature && errors.parent_guardian_signature}
          />
          <InputField
            label="Datum handtekening ouder/voogd"
            id={"parent_guardian_signature_date"}
            required={true}
            type={"date"}
            value={values.parent_guardian_signature_date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.parent_guardian_signature_date && errors.parent_guardian_signature_date}
          />
          <InputField
            label="Naam jeugdige"
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
            label="Naam vertegenwoordiger van instelling"
            id={"institution_representative_name"}
            required={true}
            type={"text"}
            value={values.institution_representative_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.institution_representative_name && errors.institution_representative_name
            }
          />
          <InputField
            label="Handtekening vertegenwoordiger van instelling"
            id={"institution_representative_signature"}
            required={true}
            type={"text"}
            value={values.institution_representative_signature}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.institution_representative_signature &&
              errors.institution_representative_signature
            }
          />
          <InputField
            label="Datum handtekening vertegenwoordiger van instelling"
            id={"institution_representative_signature_date"}
            required={true}
            type={"date"}
            value={values.institution_representative_signature_date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.institution_representative_signature_date &&
              errors.institution_representative_signature_date
            }
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
    </Panel>
  );
}
